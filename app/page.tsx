'use client';

import Link from 'next/link';
import { Shield, FileCheck, QrCode, Lock, BarChart3, Building2, ArrowRight, CheckCircle2, Upload, Menu, X, LockIcon, Mail, Phone } from 'lucide-react';
import Logo from '@/components/Logo';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Logo size="md" />
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Özellikler</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Nasıl Çalışır</a>
              <a href="#security" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Güvenlik</a>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                <LockIcon className="w-3 h-3" />
                <span>SSL Korumalı</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/upload"
                className="hidden md:inline-flex px-6 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-all font-semibold text-sm shadow-md hover:shadow-lg"
              >
                Hemen Başla
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Menüyü aç/kapat"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col gap-3">
                <a href="#features" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">Özellikler</a>
                <a href="#how-it-works" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">Nasıl Çalışır</a>
                <a href="#security" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">Güvenlik</a>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                  <LockIcon className="w-4 h-4" />
                  <span>SSL Korumalı</span>
                </div>
                <Link
                  href="/upload"
                  className="mx-4 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-all font-semibold text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hemen Başla
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-secondary to-slate-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Shield className="w-4 h-4 text-blue-300" />
              <span className="text-sm text-white/90 font-medium">Kurumsal Güvenlik Standartlarında</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-caladea, serif)' }}>
              Belge Doğrulama
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Sisteminiz
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              PDF belgeleriniz için QR kod tabanlı kurumsal doğrulama sistemi. 
              Güvenli, izlenebilir ve profesyonel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/upload"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-primary rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-2xl hover:shadow-3xl group"
              >
                <Upload className="w-5 h-5" />
                PDF Yükle
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all font-semibold text-lg border border-white/30"
              >
                Nasıl Çalışır?
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1">256-bit</div>
                <div className="text-sm text-white/70 font-medium">Şifreleme</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1">%99.9</div>
                <div className="text-sm text-white/70 font-medium">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1">7/24</div>
                <div className="text-sm text-white/70 font-medium">Erişim</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-surface-1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-caladea, serif)' }}>
              Kurumsal Özellikler
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              İşletmeniz için ihtiyacınız olan tüm güvenlik ve doğrulama araçları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-brand-primary hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-caladea, serif)' }}>Güvenli Doğrulama</h3>
              <p className="text-slate-600 leading-relaxed">
                SHA-256 hash ve JWT token ile belge bütünlüğü ve erişim kontrolü sağlanır. 
                Her belge kriptografik olarak korunur.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-brand-primary hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-caladea, serif)' }}>Detaylı Loglama</h3>
              <p className="text-slate-600 leading-relaxed">
                Tüm erişimler ve doğrulamalar kayıt altına alınır. 
                Kimin, ne zaman, nerede erişim yaptığını takip edin.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-brand-primary hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-caladea, serif)' }}>Kurumsal Tasarım</h3>
              <p className="text-slate-600 leading-relaxed">
                e-Devlet standartlarında profesyonel ve minimalist tasarım. 
                Belge türüne göre dinamik tema sistemi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-caladea, serif)' }}>
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Üç basit adımda belge doğrulama sisteminizi kurun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="relative">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                1
              </div>
              <div className="bg-surface-1 rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-slate-200 rounded-lg mb-4 flex items-center justify-center">
                  <Upload className="w-16 h-16 text-brand-primary opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">PDF Yükle</h3>
                <p className="text-slate-600">
                  Belgenizi yükleyin, sistem otomatik hash ve QR kod oluştursun.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                2
              </div>
              <div className="bg-surface-1 rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-slate-200 rounded-lg mb-4 flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-brand-primary opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">QR Kod Paylaş</h3>
                <p className="text-slate-600">
                  Oluşturulan QR kodu belgeye ekleyin veya paylaşın.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                3
              </div>
              <div className="bg-surface-1 rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-slate-200 rounded-lg mb-4 flex items-center justify-center">
                  <FileCheck className="w-16 h-16 text-brand-primary opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Belge Doğrula</h3>
                <p className="text-slate-600">
                  QR kod tarandığında belge otomatik doğrulanır ve görüntülenir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-surface-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-caladea, serif)' }}>
                Güvenlik Altyapısı
              </h2>
              <p className="text-lg text-slate-600">
                Enterprise-grade güvenlik ile verileriniz her zaman güvende
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Uçtan Uca Şifreleme</h3>
                  <p className="text-slate-600 text-sm">Tüm veriler AES-256 ile şifrelenir ve güvenli şekilde iletilir.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Erişim Kontrolü</h3>
                  <p className="text-slate-600 text-sm">JWT token ile yetkisiz erişim engellenir ve her istek doğrulanır.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Bütünlük Kontrolü</h3>
                  <p className="text-slate-600 text-sm">SHA-256 hash ile belge değişiklikleri anında tespit edilir.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Denetim Geçmişi</h3>
                  <p className="text-slate-600 text-sm">Tüm işlemler kayıt edilir, tam izlenebilirlik sağlanır.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-primary to-brand-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-caladea, serif)' }}>
            Hemen Başlayın
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            PDF belgeleriniz için kurumsal doğrulama sistemi kurun. 
            Güvenli, profesyonel ve kolay kullanılabilir.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brand-primary rounded-lg hover:bg-gray-100 transition-all font-semibold text-xl shadow-2xl group"
          >
            İlk Belgenizi Yükleyin
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Logo size="sm" showText={false} />
                <span className="text-white font-bold text-lg">DocVerify</span>
              </div>
              <p className="text-sm leading-relaxed mb-4 max-w-sm">
                Kurumsal belge doğrulama sistemi ile PDF belgelerinizi güvence altına alın. 
                Profesyonel, güvenli ve kolay kullanılabilir.
              </p>
              <div className="flex gap-3">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.742 1.026A9.005 9.005 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.175-1.61 3.016-1.34 3.016-1.34.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                </a>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">İletişim</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@docverify.com" className="hover:text-white transition-colors">info@docverify.com</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+901234567890" className="hover:text-white transition-colors">+90 123 456 7890</a>
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h3>
              <div className="space-y-2">
                <a href="#features" className="block text-sm hover:text-white transition-colors">Özellikler</a>
                <a href="#how-it-works" className="block text-sm hover:text-white transition-colors">Nasıl Çalışır</a>
                <a href="#security" className="block text-sm hover:text-white transition-colors">Güvenlik</a>
                <a href="/upload" className="block text-sm hover:text-white transition-colors">PDF Yükle</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© {new Date().getFullYear()} DocVerify. Tüm Hakları Saklıdır.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
