import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { generatePDFHash, generateDocumentNumber, generateDocumentToken } from '@/lib/document-validator';
import { generateQRCode } from '@/lib/qr-generator';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('1. FormData alınıyor...');
    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    const title = formData.get('title') as string;
    const documentType = formData.get('documentType') as string;
    const allowDownload = formData.get('allowDownload') === 'true';
    console.log('2. Dosya:', file?.name, file?.type, file?.size);

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

    console.log('3. Buffer oluşturuluyor...');
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('4. Buffer boyutu:', buffer.length);

    console.log('5. Hash oluşturuluyor...');
    const fileHash = await generatePDFHash(buffer);
    console.log('6. Hash:', fileHash.substring(0, 20) + '...');

    console.log('7. Blob\'a yükleniyor...');
    const fileName = `documents/${Date.now()}-${file.name}`;
    const blob = await put(fileName, buffer, {
      access: 'public',
      contentType: 'application/pdf',
    });
    console.log('8. Blob URL:', blob.url.substring(0, 50) + '...');

    // 3. Belge numarası oluştur
    const documentNumber = generateDocumentNumber();

    console.log('9. Veritabanına kaydediliyor...');
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

    console.log('10. JWT token oluşturuluyor...');
    const token = await generateDocumentToken(document.id, 720); // 30 gün

    console.log('11. QR kod oluşturuluyor...');
    const qrCodeUrl = await generateQRCode(document.id, token);

    console.log('12. QR kod veritabanına kaydediliyor...');
    await prisma.document.update({
      where: { id: document.id },
      data: {
        qrToken: token,
        qrCodeUrl,
      },
    });

    console.log('13. Başarılı!');
    return NextResponse.json({
      success: true,
      documentId: document.id,
      documentNumber,
      qrCodeUrl,
      fileUrl: blob.url,
      message: 'PDF başarıyla yüklendi',
    });

  } catch (error: any) {
    console.error('PDF yükleme hatası:', error);
    console.error('Hata detayı:', error?.message, error?.stack);

    return NextResponse.json(
      {
        error: 'PDF yükleme sırasında bir hata oluştu',
        details: error?.message || 'Bilinmeyen hata',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}
