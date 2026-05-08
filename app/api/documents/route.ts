import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { generatePDFHash, generateDocumentNumber, generateDocumentToken } from '@/lib/document-validator';
import { generateQRCode } from '@/lib/qr-generator';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    const title = formData.get('title') as string;
    const documentType = formData.get('documentType') as string;
    const allowDownload = formData.get('allowDownload') === 'true';

    // Validation
    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Sadece PDF dosyaları kabul edilir' },
        { status: 400 }
      );
    }

    if (!title || !documentType) {
      return NextResponse.json(
        { error: 'Başlık ve belge türü zorunludur' },
        { status: 400 }
      );
    }

    // PDF buffer'ı al
    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Hash oluştur
    const fileHash = await generatePDFHash(buffer);

    // 2. Vercel Blob'a yükle
    const fileName = `documents/${Date.now()}-${file.name}`;
    const blob = await put(fileName, buffer, {
      access: 'public',
      contentType: 'application/pdf',
    });

    // 3. Belge numarası oluştur
    const documentNumber = generateDocumentNumber();

    // 4. Veritabanına kaydet
    const document = await prisma.document.create({
      data: {
        title,
        documentNumber,
        documentType,
        fileUrl: blob.url,
        fileSize: file.size,
        fileHash,
        pageCount: 1, // TODO: PDF.js ile sayfa sayısını al
        allowDownload,
        digitalSignature: false,
      },
    });

    // 5. JWT token oluştur
    const token = await generateDocumentToken(document.id, 720); // 30 gün

    // 6. QR kod oluştur
    const qrCodeUrl = await generateQRCode(document.id, token);

    // 7. QR kod'u veritabanına kaydet
    await prisma.document.update({
      where: { id: document.id },
      data: {
        qrToken: token,
        qrCodeUrl,
      },
    });

    return NextResponse.json({
      success: true,
      documentId: document.id,
      documentNumber,
      qrCodeUrl,
      fileUrl: blob.url,
      message: 'PDF başarıyla yüklendi',
    });

  } catch (error) {
    console.error('PDF yükleme hatası:', error);
    
    return NextResponse.json(
      { error: 'PDF yükleme sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
