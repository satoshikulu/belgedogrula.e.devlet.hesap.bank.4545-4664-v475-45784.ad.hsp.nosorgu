import QRCode from 'qrcode';

/**
 * QR Code DataURL oluştur
 */
export async function generateQRCode(
  documentId: string,
  token: string
): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_URL}/verify/${documentId}?token=${token}`;
  
  const qrDataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H', // Yüksek hata düzeltme
    margin: 2,
    width: 512,
    color: {
      dark: '#1a365d', // Lacivert
      light: '#ffffff',
    },
  });
  
  return qrDataUrl;
}

/**
 * QR Code dosyası olarak kaydet (opsiyonel)
 */
export async function generateQRCodeFile(
  documentId: string,
  token: string,
  outputPath: string
): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_URL}/verify/${documentId}?token=${token}`;
  
  await QRCode.toFile(outputPath, url, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 512,
    color: {
      dark: '#1a365d',
      light: '#ffffff',
    },
  });
}
