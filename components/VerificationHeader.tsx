'use client';

import { CheckCircle, XCircle, AlertCircle, Building2, Calendar, Hash, FileText } from 'lucide-react';

interface VerificationHeaderProps {
  document: {
    title: string;
    documentNumber: string;
    type: string;
    createdAt: string;
    organization?: string;
    verificationCount?: number;
    lastVerifiedAt?: string;
  };
  verified: boolean;
  theme: string;
}

const themeColors = {
  official: { primary: '#1a365d', accent: '#c53030' },
  certificate: { primary: '#1e3a8a', accent: '#d69e2e' },
  commercial: { primary: '#2b6cb0', accent: '#38a169' },
  legal: { primary: '#1a202c', accent: '#744210' },
};

export default function VerificationHeader({ 
  document, 
  verified,
  theme 
}: VerificationHeaderProps) {
  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.official;

  return (
    <header className="shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)` }}>
      <div className="container mx-auto px-4 py-8">
        {/* Logo ve Başlık */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Belge Doğrulama Sistemi</h1>
              <p className="text-white/80 text-sm">Kurumsal Doğrulama Platformu</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-white/80 text-sm flex items-center gap-1 justify-end">
              <Hash className="w-4 h-4" />
              Belge No
            </p>
            <p className="text-white font-mono font-bold text-lg">{document.documentNumber}</p>
          </div>
        </div>

        {/* Doğrulama Durumu */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-start gap-4">
            {verified ? (
              <div className="relative">
                <CheckCircle className="w-16 h-16 text-green-400 flex-shrink-0" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              </div>
            ) : (
              <XCircle className="w-16 h-16 text-red-400 flex-shrink-0" />
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-white">
                  {verified ? 'Doğrulanmış Belge' : 'Doğrulama Başarısız'}
                </h2>
              </div>
              
              {verified && document.verificationCount !== undefined && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-200 font-medium">
                    Bu belge {document.verificationCount} kez doğrulandı
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                <div className="flex items-start gap-2">
                  <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/70">Belge Başlığı</p>
                    <p className="font-semibold">{document.title}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/70">Belge Türü</p>
                    <p className="font-semibold capitalize">{document.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/70">Oluşturulma Tarihi</p>
                    <p className="font-semibold">{new Date(document.createdAt).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
                {document.organization && (
                  <div className="flex items-start gap-2">
                    <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white/70">Kurum</p>
                      <p className="font-semibold">{document.organization}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {verified && document.lastVerifiedAt && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Calendar className="w-5 h-5" />
                    <p className="text-sm">
                      Son doğrulama:{' '}
                      <span className="font-semibold text-white">
                        {new Date(document.lastVerifiedAt).toLocaleString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {verified && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-green-300">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">
                  Bu belge dijital olarak doğrulanmıştır ve orijinal hali korunmaktadır.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
