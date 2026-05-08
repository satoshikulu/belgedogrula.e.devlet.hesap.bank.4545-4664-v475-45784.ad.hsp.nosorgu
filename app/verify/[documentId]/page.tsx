import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PDFViewer from '@/components/PDFViewer';
import VerificationHeader from '@/components/VerificationHeader';
import SecurityFooter from '@/components/SecurityFooter';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { verifyDocumentToken } from '@/lib/document-validator';
import { prisma } from '@/lib/prisma';

interface VerifyPageProps {
  params: Promise<{ documentId: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyPage({ 
  params,
  searchParams,
}: VerifyPageProps) {
  const { documentId } = await params;
  const { token } = await searchParams;

  // Token doğrulama
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Erişim Token&apos;ı Gerekli
            </h2>
            <p className="text-gray-600">
              Bu belgeye erişmek için geçerli bir QR kod taramanız gerekmektedir.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Token'ı doğrula
  const documentIdFromToken = await verifyDocumentToken(token);
  if (!documentIdFromToken || documentIdFromToken !== documentId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Geçersiz Token
            </h2>
            <p className="text-gray-600">
              Belge erişim token&apos;ı geçersiz veya süresi dolmuş. Lütfen QR kodu yeniden tarayın.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Belgeyi veritabanından al
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document || !document.isActive) {
    notFound();
  }

// Erişim logunu kaydet
  await prisma.accessLog.create({
    data: {
      documentId,
      action: 'verified',
      ipAddress: '127.0.0.1', // Gerçek IP için request IP kullanılmalı
      userAgent: 'Unknown',
    },
  });

  // Doğrulama sayısını artır
  const updatedDocument = await prisma.document.update({
    where: { id: documentId },
    data: {
      verificationCount: { increment: 1 },
      lastVerifiedAt: new Date(),
    },
  });

  // Tema belirle
  const theme = document.documentType as 'official' | 'certificate' | 'commercial' | 'legal';

  return (
    <div className="min-h-screen bg-gray-50">
      <VerificationHeader 
        document={{
          title: document.title,
          documentNumber: document.documentNumber,
          type: document.documentType,
          createdAt: document.createdAt.toISOString(),
          organization: undefined, // TODO: Organization tablosundan alınabilir
          verificationCount: updatedDocument.verificationCount,
          lastVerifiedAt: updatedDocument.lastVerifiedAt?.toISOString(),
        }}
        verified={true}
        theme={theme}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <PDFViewer
            fileUrl={document.fileUrl}
            documentData={{
              title: document.title,
              documentNumber: document.documentNumber,
              type: document.documentType,
              verified: true,
            }}
            allowDownload={document.allowDownload}
            theme={theme}
          />
        </Suspense>
      </main>
      
      <SecurityFooter 
        hash={document.fileHash}
        verificationCount={updatedDocument.verificationCount}
        lastVerified={updatedDocument.lastVerifiedAt?.toISOString() || document.createdAt.toISOString()}
      />
    </div>
  );
}
