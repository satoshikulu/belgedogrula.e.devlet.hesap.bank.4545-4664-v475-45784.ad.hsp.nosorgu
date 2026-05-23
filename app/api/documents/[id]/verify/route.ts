import { NextRequest, NextResponse } from 'next/server';
import { verifyDocumentToken } from '@/lib/document-validator';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.nextUrl.searchParams.get('token');

    // Token doğrulama
    if (!token) {
      return NextResponse.json(
        { error: 'Token gerekli' },
        { status: 401 }
      );
    }

    const documentIdFromToken = await verifyDocumentToken(token);
    if (!documentIdFromToken || documentIdFromToken !== id) {
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      );
    }

    // Belgeyi bul ve istatistikleri güncelle
    const document = await prisma.document.update({
      where: { id },
      data: {
        verificationCount: { increment: 1 },
        lastVerifiedAt: new Date(),
      },
    });

    if (!document || !document.isActive) {
      return NextResponse.json(
        { error: 'Belge bulunamadı veya aktif değil' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      document: {
        id: document.id,
        title: document.title,
        documentNumber: document.documentNumber,
        type: document.documentType,
        pageCount: document.pageCount,
        createdAt: document.createdAt,
        allowDownload: document.allowDownload,
        fileHash: document.fileHash,
        verificationCount: document.verificationCount,
        lastVerifiedAt: document.lastVerifiedAt,
      },
      fileUrl: document.fileUrl,
      theme: document.documentType,
    });

  } catch (error) {
    console.error('Doğrulama hatası:', error);
    
    return NextResponse.json(
      { error: 'Doğrulama sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
