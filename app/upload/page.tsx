'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, Shield, CheckCircle, ArrowLeft, Loader2, FileBadge, Award, Briefcase, Scale } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('official');
  const [allowDownload, setAllowDownload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<{
    documentId: string;
    documentNumber: string;
    qrCodeUrl: string;
    fileUrl: string;
    qrToken?: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Lütfen bir PDF dosyası seçin');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('title', title || file.name);
      formData.append('documentType', documentType);
      formData.append('allowDownload', allowDownload.toString());

      // Simulate progress (gerçek implementasyonda upload progress API kullanılmalı)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Yükleme başarısız');
      }

      setResult(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setError(errorMessage);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  // Drag and Drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        setError('Lütfen geçerli bir PDF dosyası seçin');
      }
    }
  }, []);

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              PDF Başarıyla Yüklendi
            </h2>
            <p className="text-gray-600">Belge doğrulama sistemi kaydedildi</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-3 border border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Belge No:</span>
              <span className="font-mono font-bold text-slate-900">{result.documentNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Belge ID:</span>
              <span className="font-mono text-sm text-slate-900">{result.documentId}</span>
            </div>
          </div>

          {result.qrCodeUrl && (
            <div className="text-center mb-8 p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl">
              <p className="text-slate-900 font-semibold mb-4">QR Kod</p>
              <img 
                src={result.qrCodeUrl} 
                alt="QR Code" 
                className="mx-auto rounded-lg shadow-lg"
                style={{ maxWidth: '350px' }}
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setResult(null)}
              className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-slate-900 transition-all font-medium flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Yeni Belge
            </button>
            <a
              href={`/verify/${result.documentId}?token=${result.qrToken}`}
              target="_blank"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium flex items-center justify-center gap-2"
            >
              Belgeyi Görüntüle
              <Shield className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-1 via-blue-50 to-surface-2">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(26, 58, 95) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full border border-gray-200">
          {/* Header */}
          <div className="text-center mb-10">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfaya Dön
            </Link>
            
            <div className="mb-4">
              <Logo size="lg" className="justify-center" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: 'var(--font-caladea, serif)' }}>
              PDF Belge Yükle
            </h1>
            <p className="text-slate-600 leading-relaxed">
              PDF dosyanızı yükleyin ve kurumsal doğrulama sistemi oluşturun
            </p>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Belge Başlığı
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Opsiyonel - Dosya adı kullanılacak"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              />
            </div>

            {/* File Input with Drag & Drop */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                PDF Dosyası
              </label>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  dragActive 
                    ? 'border-brand-primary bg-blue-50 scale-[1.02]' 
                    : file 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-brand-primary hover:bg-surface-1'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="pdf-input"
                />
                <label htmlFor="pdf-input" className="cursor-pointer block">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
                    dragActive ? 'bg-brand-primary scale-110' : file ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {dragActive ? (
                      <Upload className="w-8 h-8 text-white animate-bounce" />
                    ) : file ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <Upload className="w-8 h-8 text-brand-primary" />
                    )}
                  </div>
                  <p className="text-slate-900 font-semibold mb-1">
                    {file ? file.name : dragActive ? 'Dosyayı bırakın' : 'PDF dosyasını seçmek için tıklayın veya sürükleyin'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Maksimum dosya boyutu: 50MB'}
                  </p>
                </label>
              </div>
            </div>

            {/* Document Type - Card Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Belge Türü
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDocumentType('official')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    documentType === 'official'
                      ? 'border-brand-primary bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      documentType === 'official' ? 'bg-brand-primary' : 'bg-slate-100'
                    }`}>
                      <FileBadge className={`w-5 h-5 ${documentType === 'official' ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <h3 className={`font-semibold ${documentType === 'official' ? 'text-brand-primary' : 'text-slate-900'}`} style={{ fontFamily: 'var(--font-caladea, serif)' }}>
                      Resmi Belge
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">Kurumsal resmi belgeler</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDocumentType('certificate')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    documentType === 'certificate'
                      ? 'border-brand-accent bg-cyan-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      documentType === 'certificate' ? 'bg-brand-accent' : 'bg-slate-100'
                    }`}>
                      <Award className={`w-5 h-5 ${documentType === 'certificate' ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <h3 className={`font-semibold ${documentType === 'certificate' ? 'text-brand-accent' : 'text-slate-900'}`} style={{ fontFamily: 'var(--font-caladea, serif)' }}>
                      Sertifika
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">Eğitim ve başarı belgeleri</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDocumentType('commercial')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    documentType === 'commercial'
                      ? 'border-green-600 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      documentType === 'commercial' ? 'bg-green-600' : 'bg-slate-100'
                    }`}>
                      <Briefcase className={`w-5 h-5 ${documentType === 'commercial' ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <h3 className={`font-semibold ${documentType === 'commercial' ? 'text-green-600' : 'text-slate-900'}`} style={{ fontFamily: 'var(--font-caladea, serif)' }}>
                      Ticari Belge
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">Fatura, teklif ve raporlar</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDocumentType('legal')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    documentType === 'legal'
                      ? 'border-slate-800 bg-slate-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      documentType === 'legal' ? 'bg-slate-800' : 'bg-slate-100'
                    }`}>
                      <Scale className={`w-5 h-5 ${documentType === 'legal' ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <h3 className={`font-semibold ${documentType === 'legal' ? 'text-slate-800' : 'text-slate-900'}`} style={{ fontFamily: 'var(--font-caladea, serif)' }}>
                      Yasal Belge
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">Sözleşme ve dilekçeler</p>
                </button>
              </div>
            </div>

            {/* Allow Download */}
            <div className="flex items-center gap-3 p-4 bg-surface-1 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="allowDownload"
                checked={allowDownload}
                onChange={(e) => setAllowDownload(e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
              <label htmlFor="allowDownload" className="text-slate-900 cursor-pointer font-medium">
                Kullanıcıların PDF&apos;yi indirmesine izin ver
              </label>
            </div>

            {/* Progress Bar */}
            {uploading && uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Yükleniyor...</span>
                  <span className="font-semibold text-slate-900">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full px-6 py-4 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Yükleniyor... {uploadProgress}%
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  PDF Yükle ve QR Kod Oluştur
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
