import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const barcode = request.nextUrl.searchParams.get('barcode');

    if (!barcode) {
      return NextResponse.json(
        { error: 'Barkod numarası gerekli' },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { documentNumber: barcode },
      select: {
        id: true,
        qrToken: true,
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Belge bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      documentId: document.id,
      token: document.qrToken,
    });

  } catch (error) {
    console.error('Belge arama hatası:', error);
    return NextResponse.json(
      { error: 'Arama sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
