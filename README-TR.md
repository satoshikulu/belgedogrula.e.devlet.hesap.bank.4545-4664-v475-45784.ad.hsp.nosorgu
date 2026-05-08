# 📄 PDF Belge Doğrulama Sistemi - Kurulum Kılavuzu

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Veritabanını Kur

```bash
# SQLite veritabanını oluştur
npx prisma db push
```

### 3. Uygulamayı Başlat

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

---

## 📋 Özellikler

✅ **PDF Yükleme ve İşleme**
- PDF dosyalarını yükleme
- Otomatik SHA-256 hash oluşturma
- QR kod oluşturma
- Vercel Blob storage entegrasyonu

✅ **Belge Doğrulama**
- QR kod ile hızlı doğrulama
- JWT token tabanlı güvenlik
- Belge bütünlüğü kontrolü
- Erişim loglama

✅ **Kurumsal Tasarım**
- e-Devlet tarzı profesyonel tasarım
- 4 farklı tema (Resmi, Sertifika, Ticari, Yasal)
- Responsive ve mobil uyumlu
- Watermark ve background pattern'ler

✅ **Güvenlik**
- SHA-256 hash doğrulama
- JWT token ile erişim kontrolü
- Erişim logları
- Opsiyonel şifre koruması

---

## 🗂️ Proje Yapısı

```
pdf-dogrulama-sistemi/
├── app/
│   ├── api/
│   │   └── documents/
│   │       ├── route.ts              # PDF yükleme API
│   │       └── [id]/verify/
│   │           └── route.ts          # Belge doğrulama API
│   ├── verify/[documentId]/
│   │   └── page.tsx                  # Doğrulama sayfası
│   ├── upload/
│   │   └── page.tsx                  # PDF yükleme sayfası
│   └── page.tsx                      # Ana sayfa
├── components/
│   ├── PDFViewer.tsx                 # PDF görüntüleyici
│   ├── VerificationHeader.tsx        # Doğrulama başlığı
│   └── SecurityFooter.tsx            # Güvenlik altbilgisi
├── lib/
│   ├── prisma.ts                     # Prisma client
│   ├── document-validator.ts         # Hash ve token işlemleri
│   └── qr-generator.ts               # QR kod oluşturma
├── prisma/
│   └── schema.prisma                 # Veritabanı şeması
└── .env                              # Environment variables
```

---

## 🔧 Konfigürasyon

### Environment Variables (.env)

```env
# SQLite Veritabanı
DATABASE_URL="file:./prisma/dev.db"

# Vercel Blob Storage (Opsiyonel - Ücretsiz tier mevcut)
# https://vercel.com/blob adresinden alın
BLOB_READ_WRITE_TOKEN="vercel_blob_token_here"

# JWT Secret (Güvenlik için değiştirin)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Uygulama URL
NEXT_PUBLIC_URL="http://localhost:3000"
API_URL="http://localhost:3000"
```

---

## 📱 Kullanım

### 1. PDF Yükleme

1. `http://localhost:3000/upload` adresine gidin
2. PDF dosyasını seçin
3. Belge başlığı ve türünü belirleyin
4. "PDF Yükle ve QR Kod Oluştur" butonuna tıklayın
5. QR kodu indirin veya paylaşın

### 2. Belge Doğrulama

QR kodu taradığınızda otomatik olarak doğrulama sayfası açılır:
- Belge görüntülenir (PDF.js ile)
- Doğrulama bilgileri gösterilir
- Güvenlik hash'i doğrulanır

---

## 🎨 Tema Sistemi

Belge türüne göre otomatik tema seçimi:

| Tür | Açıklama | Renkler |
|-----|----------|---------|
| `official` | Resmi Kurumsal | Lacivert/Gri |
| `certificate` | Eğitim Sertifikası | Mavi/Altın |
| `commercial` | Ticari Belge | Mavi/Beyaz |
| `legal` | Yasal Belge | Siyah/Gri |

---

## 🔒 Güvenlik

### Hash Doğrulama
- Her PDF için SHA-256 hash oluşturulur
- Belge erişildiğinde hash doğrulanır
- Değişiklik yapılırsa tespit edilir

### Token Sistemi
- JWT token ile erişim kontrolü
- Varsayılan: 30 gün geçerlilik
- Opsiyonel: Süre sınırlama

### Erişim Logları
- Her erişim kaydedilir (IP, zaman, kullanıcı ajanı)
- Kaç kez doğrulandığı takip edilir
- Denetim geçmişi oluşturulur

---

## 🚀 Production Deployment

### Vercel Deployment

```bash
# Vercel CLI kur
npm i -g vercel

# Deploy et
vercel
```

### Database (Production)

Production için PostgreSQL kullanılması önerilir:

1. Supabase veya Neon.tech'den veritabanı alın
2. `.env` dosyasında `DATABASE_URL` güncelleyin
3. `prisma/schema.prisma` dosyasında `provider = "postgresql"` yapın
4. `npx prisma migrate dev` çalıştırın

### Storage

Vercel Blob Storage kullanın:
- Ücretsiz tier: 1GB storage
- Kolay entegrasyon
- Otomatik CDN

---

## 📦 Gerekli Paketler

```json
{
  "dependencies": {
    "next": "^16.2.5",
    "react": "^19.2.4",
    "react-pdf": "^7.7.0",
    "pdfjs-dist": "^4.0.379",
    "@vercel/blob": "^0.22.0",
    "pdf-lib": "^1.17.1",
    "qrcode": "^1.5.3",
    "jsonwebtoken": "^9.0.2",
    "sharp": "^0.33.2",
    "@prisma/client": "^7.8.0"
  },
  "devDependencies": {
    "prisma": "^7.8.0",
    "typescript": "^5",
    "tailwindcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/qrcode": "^1.5.5"
  }
}
```

---

## 🐛 Sorun Giderme

### Prisma Hatası

```bash
# Prisma client'ı yeniden oluştur
npx prisma generate

# Veritabanını sıfırla
npx prisma db push --force-reset
```

### PDF.js Worker Hatası

`components/PDFViewer.tsx` dosyasında workerSrc URL'sini kontrol edin.

### Module Not Found

```bash
# Tüm paketleri yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 API Endpoints

### POST /api/documents
PDF dosyası yükle ve QR kod oluştur

**Request:**
```typescript
FormData {
  pdf: File,
  title: string,
  documentType: 'official' | 'certificate' | 'commercial' | 'legal',
  allowDownload: boolean
}
```

**Response:**
```typescript
{
  success: boolean,
  documentId: string,
  documentNumber: string,
  qrCodeUrl: string,
  fileUrl: string
}
```

### GET /api/documents/[id]/verify?token=xxx
Belge doğrula ve bilgilerini al

**Response:**
```typescript
{
  valid: boolean,
  document: {
    id: string,
    title: string,
    type: string,
    pageCount: number,
    createdAt: string,
    fileHash: string,
    verificationCount: number
  },
  fileUrl: string,
  theme: string
}
```

---

## 📞 Destek

Sorularınız için:
- GitHub Issues
- Dokümantasyon: [SISTEM_ONERISI.md](../SISTEM_ONERISI.md)
- Teknik Plan: [PDF_SISTEM_PLAN.md](../PDF_SISTEM_PLAN.md)

---

## 📝 Lisans

MIT License

---

**Not**: Bu sistem kurumsal kullanım için tasarlanmıştır. Güvenlik ve performans için production deployment öncesi tüm konfigürasyonları kontrol edin.
