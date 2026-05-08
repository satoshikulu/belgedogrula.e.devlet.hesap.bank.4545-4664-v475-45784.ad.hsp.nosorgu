'use client';

import { Shield, Hash, BarChart3, Clock, CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

interface SecurityFooterProps {
  hash: string;
  verificationCount: number;
  lastVerified: string;
}

export default function SecurityFooter({ 
  hash, 
  verificationCount,
  lastVerified 
}: SecurityFooterProps) {
  const [copied, setCopied] = useState(false);

  const shortenHash = (hash: string) => {
    if (hash.length <= 16) return hash;
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Güvenlik Bilgileri */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-gray-700 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Güvenlik Bilgileri
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hash Bilgisi */}
            <div>
              <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                <Hash className="w-4 h-4" />
                Dijital İmza (SHA-256)
              </p>
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-2 bg-slate-900 rounded px-3 py-2.5 border border-gray-700 hover:border-gray-600 transition-all group"
                title="Hash'i kopyala"
              >
                <code className="flex-1 text-xs font-mono text-green-400 text-left truncate">
                  {shortenHash(hash)}
                </code>
                <Copy className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  copied ? 'text-green-400' : 'text-gray-500 group-hover:text-white'
                }`} />
              </button>
              {copied && (
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Hash panoya kopyalandı
                </p>
              )}
            </div>
            
            {/* Doğrulama Bilgileri */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Doğrulama Sayısı</p>
                  <p className="text-2xl font-bold text-white">{verificationCount} kez</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Son Doğrulama</p>
                  <p className="text-lg font-semibold text-white">
                    {new Date(lastVerified).toLocaleString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bilgi Notları */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-gray-700">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-400">
                Bu belge dijital olarak imzalanmıştır ve bütünlüğü doğrulanmıştır.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-400">
                Belge üzerinde herhangi bir değişiklik yapılmamıştır.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-400">
                Tüm erişim logları güvenlik amacıyla kaydedilmektedir.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Belge Doğrulama Sistemi | Tüm Hakları Saklıdır</p>
          <p className="mt-2 text-gray-600">
            Bu sistem kurumsal standartlara uygun olarak tasarlanmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
}
