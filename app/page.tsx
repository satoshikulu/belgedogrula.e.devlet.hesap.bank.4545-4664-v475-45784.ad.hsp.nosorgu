'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import turkeyLogo from '../assets/Üst navigasyon — turkiye.gov.tr logosu.png';
import belgeLogo from '../assets/Belge Doğrulama logo.png';

export default function Home() {
  const [barkod, setBarkod] = useState('');
  const router = useRouter();

  const handleDevamEt = () => {
    if (barkod.trim()) {
      router.push(`/verify?barkod=${encodeURIComponent(barkod.trim())}`);
    }
  };

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: 13, background: '#e8e8e8', color: '#333', minHeight: '100vh' }}>

      {/* TOP NAV */}
      <nav style={{ background: 'linear-gradient(180deg, #1a8fd1 0%, #0068a8 100%)', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#" style={{ display: 'block', lineHeight: 0 }}>
            <Image
              src={turkeyLogo}
              alt="türkiye.gov.tr e-Devlet Kapısı"
              height={50}
              style={{ display: 'block', mixBlendMode: 'screen' }}
            />
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button style={{ background: 'transparent', border: 'none', color: 'white', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 3 }}>
            <svg style={{ width: 14, height: 14, fill: 'white' }} viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            Hızlı Çözüm
          </button>
          <button style={{ background: 'transparent', border: 'none', color: 'white', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 3 }}>
            <svg style={{ width: 14, height: 14, fill: 'white' }} viewBox="0 0 24 24"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
            ▾
          </button>
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 3, overflow: 'hidden', height: 30 }}>
            <input type="text" placeholder="Nasıl yardım edebilirim?" style={{ border: 'none', outline: 'none', padding: '0 10px', fontSize: 12, width: 200, color: '#555' }} />
            <button style={{ background: 'transparent', border: 'none', padding: '0 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0072bc' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0072bc"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </button>
          </div>
          <button style={{ background: 'white', color: '#0072bc', border: 'none', padding: '0 14px', height: 30, borderRadius: 3, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
            Giriş Yap
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0072bc"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </button>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div style={{ background: 'white', padding: '6px 20px', fontSize: 12, color: '#555', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #ddd' }}>
        <span>🏠</span>
        <span style={{ color: '#aaa' }}>›</span>
        <a href="#" style={{ color: '#0072bc', textDecoration: 'none' }}>Belge Doğrulama</a>
      </div>

      {/* PAGE BODY */}
      <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 15px' }}>
        <div style={{ background: 'white', borderRadius: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.12)', overflow: 'hidden' }}>

          {/* Card Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Image
                src={belgeLogo}
                alt="Belge Doğrulama"
                height={43}
                style={{ display: 'block' }}
              />
            </div>
            <button style={{ background: 'transparent', border: '1px solid #ccc', borderRadius: 3, padding: '5px 12px', fontSize: 12, color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#555"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
              Paylaş
            </button>
          </div>

          {/* Card Body */}
          <div style={{ display: 'flex' }}>

            {/* SIDEBAR */}
            <aside style={{ width: 230, minWidth: 230, padding: '20px 16px', borderRight: '1px solid #e0e0e0', background: '#fafafa' }}>
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.6, marginBottom: 16 }}>
                Bu hizmet barkodlu belge sahibi kurumların işbirliği ile e-Devlet Kapısı altyapısı üzerinden sunulmaktadır.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '14px 0 6px', color: '#555', fontSize: 12 }}>
                <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div style={{ fontSize: 12, color: '#444', marginBottom: 8, lineHeight: 1.5 }}>
                Bu işlem için yaklaşık 3 dakikanızı ayırmalısınız.
              </div>
              <div style={{ fontSize: 12, color: '#444', marginBottom: 8, lineHeight: 1.5 }}>
                Bu işlem toplam 4 aşamalıdır. Şu anda <strong>1.</strong> aşamadasınız.
              </div>
              <div style={{ width: '100%', height: 8, background: '#ddd', borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
                <div style={{ width: '25%', height: '100%', background: '#0072bc', borderRadius: 4 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ padding: '7px 10px', fontSize: 12, borderRadius: 3, background: '#0072bc', color: 'white', fontWeight: 600 }}>1. Barkod Numarası</div>
                <div style={{ padding: '7px 10px', fontSize: 12, borderRadius: 3, color: '#aaa', background: '#f0f0f0', border: '1px solid #e0e0e0' }}>2. Sorgulama Alanı</div>
                <div style={{ padding: '7px 10px', fontSize: 12, borderRadius: 3, color: '#aaa', background: '#f0f0f0', border: '1px solid #e0e0e0' }}>3. Bilgilendirme ve Onay</div>
                <div style={{ padding: '7px 10px', fontSize: 12, borderRadius: 3, color: '#aaa', background: '#f0f0f0', border: '1px solid #e0e0e0' }}>4. İşlem Sonucu</div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main style={{ flex: 1, padding: '24px 28px' }}>
              <div style={{ background: '#f0f7ff', borderLeft: '3px solid #0072bc', padding: '10px 14px', fontSize: 12.5, color: '#333', marginBottom: 20, borderRadius: '0 3px 3px 0' }}>
                e-Devlet Kapısı üzerinden oluşturulan tüm barkodlu belgeleri burada doğrulayabilirsiniz.
              </div>

              <div style={{ border: '1px solid #d0e8f5', borderRadius: 4, overflow: 'hidden', marginBottom: 20 }}>
                <div style={{ background: '#e6f2fb', padding: '10px 14px', fontSize: 13, fontWeight: 600, color: '#0072bc', borderBottom: '1px solid #c8e0f0' }}>
                  Belge Doğrulama
                </div>
                <div style={{ padding: '20px 18px' }}>
                  <div style={{ marginBottom: 6 }}>
                    <label style={{ fontSize: 12.5, fontWeight: 600, color: '#333', marginBottom: 6, display: 'block' }}>
                      <span style={{ color: '#c00', marginRight: 2 }}>*</span>Barkod Numarası
                    </label>
                    <input
                      type="text"
                      value={barkod}
                      onChange={(e) => setBarkod(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleDevamEt()}
                      style={{ width: '100%', maxWidth: 500, height: 36, border: '1px solid #bbb', borderRadius: 3, padding: '0 10px', fontSize: 13, color: '#333', outline: 'none' }}
                    />
                    <div style={{ fontSize: 11, color: '#777', marginTop: 5 }}>
                      Doğrulamak istediğiniz belgeye ait barkod numarasını giriniz.
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 18, background: '#f0f7ff', borderTop: '1px solid #d0e8f5' }}>
                  <button
                    onClick={handleDevamEt}
                    style={{ background: '#005a9c', color: 'white', border: 'none', borderRadius: 20, padding: '10px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    Devam Et
                    <svg style={{ width: 16, height: 16, fill: 'white' }} viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* MOBILE APP BANNER */}
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: 4, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 14, marginTop: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/altlogo.png" alt="Logo" style={{ width: 40, height: 40, objectFit: 'cover' }} />
          </div>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.6 }}>
            e-Devlet mobil uygulamasında yer alan Barkodlu Belge Doğrulama özelliği ile, belgenin üzerindeki karekod&apos;u okutarak, belgeleri daha hızlı ve kolay bir şekilde doğrulayabilirsiniz.
            <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
              <a href="#" style={{ color: '#0072bc', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>Android</a>
              <span style={{ color: '#aaa' }}>|</span>
              <a href="#" style={{ color: '#0072bc', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>Apple iOS</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
