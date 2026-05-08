import crypto from 'crypto';
import jwt from 'jsonwebtoken';

/**
 * PDF dosyasının SHA-256 hash'ini oluştur
 */
export async function generatePDFHash(fileBuffer: Buffer): Promise<string> {
  const hash = crypto.createHash('sha256');
  hash.update(fileBuffer);
  return hash.digest('hex');
}

/**
 * PDF hash'ini doğrula (dosya bütünlüğü kontrolü)
 */
export async function verifyPDFIntegrity(
  originalHash: string,
  currentFileBuffer: Buffer
): Promise<boolean> {
  const currentHash = await generatePDFHash(currentFileBuffer);
  return originalHash === currentHash;
}

/**
 * Benzersiz belge numarası oluştur
 */
export function generateDocumentNumber(): string {
  const prefix = 'DOC';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * JWT token oluştur (belge erişim için)
 */
export async function generateDocumentToken(
  documentId: string,
  expiresInHours: number = 24
): Promise<string> {
  const expiresInSeconds = expiresInHours * 60 * 60;
  
  const token = jwt.sign(
    {
      documentId,
      type: 'document-verification',
      issuedAt: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET!,
    { expiresIn: expiresInSeconds }
  );
  
  return token;
}

/**
 * JWT token doğrula
 */
export async function verifyDocumentToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { documentId: string };
    return decoded.documentId;
  } catch (error) {
    return null;
  }
}
 * PDF dosyasının SHA-256 hash'ini oluştur
 */
export async function generatePDFHash(fileBuffer: Buffer): Promise<string> {
  const hash = crypto.createHash('sha256');
  hash.update(fileBuffer);
  return hash.digest('hex');
}

/**
 * PDF hash'ini doğrula (dosya bütünlüğü kontrolü)
 */
export async function verifyPDFIntegrity(
  originalHash: string,
  currentFileBuffer: Buffer
): Promise<boolean> {
  const currentHash = await generatePDFHash(currentFileBuffer);
  return originalHash === currentHash;
}

/**
 * Benzersiz belge numarası oluştur
 */
export function generateDocumentNumber(): string {
  const prefix = 'DOC';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * JWT token oluştur (belge erişim için)
 */
export async function generateDocumentToken(
  documentId: string,
  expiresInHours: number = 24
): Promise<string> {
  const expiresInSeconds = expiresInHours * 60 * 60;
  
  const token = jwt.sign(
    {
      documentId,
      type: 'document-verification',
      issuedAt: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET!,
    { expiresIn: expiresInSeconds }
  );
  
  return token;
}

/**
 * JWT token doğrula
 */
export async function verifyDocumentToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { documentId: string };
    return decoded.documentId;
  } catch (error) {
    return null;
  }
}
