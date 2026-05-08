import Link from 'next/link';
import { Home, FileX, Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-1 via-blue-50 to-surface-2 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-gray-200 text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileX className="w-12 h-12 text-red-600" />
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-2">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Belge Bulunamadı
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Aradığınız belge mevcut değil veya kaldırılmış olabilir. 
            Lütfen QR kodu yeniden tarayın veya yönetici ile iletişime geçin.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-surface-1 rounded-xl p-4 mb-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Ne yapabilirsiniz?</h3>
          <ul className="text-sm text-slate-600 space-y-1 text-left">
            <li className="flex items-start gap-2">
              <span className="text-brand-primary font-bold mt-0.5">•</span>
              <span>QR kodu yeniden tarayın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-primary font-bold mt-0.5">•</span>
              <span>Belge bağlantısını kontrol edin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-primary font-bold mt-0.5">•</span>
              <span>Belgeyi oluşturan kişi ile iletişime geçin</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-all font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/upload"
            className="flex-1 px-6 py-3 bg-white text-brand-primary rounded-lg hover:bg-surface-1 transition-all font-semibold border-2 border-brand-primary flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Yeni Belge Yükle
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-slate-500">
            Hata Kodu: 404 | Belge bulunamadı | {new Date().toLocaleDateString('tr-TR')}
          </p>
        </div>
      </div>
    </div>
  );
}
