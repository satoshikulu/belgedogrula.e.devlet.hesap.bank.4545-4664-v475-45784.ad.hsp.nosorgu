'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// PDF.js worker ayarla
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  fileUrl: string;
  documentData: {
    title: string;
    documentNumber: string;
    type: string;
    verified: boolean;
  };
  allowDownload: boolean;
  theme: 'official' | 'certificate' | 'commercial' | 'legal';
}

// Tema ayarları
const themeStyles = {
  official: {
    primary: '#1a365d',
    secondary: '#2c5282',
    background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
    pattern: '/patterns/guilloche-official.svg',
  },
  certificate: {
    primary: '#1e3a8a',
    secondary: '#d69e2e',
    background: 'linear-gradient(135deg, #fefefe 0%, #f7fafc 100%)',
    pattern: '/patterns/certificate-ornament.svg',
  },
  commercial: {
    primary: '#2b6cb0',
    secondary: '#4a5568',
    background: '#ffffff',
    pattern: '/patterns/geometric-subtle.svg',
  },
  legal: {
    primary: '#1a202c',
    secondary: '#4a5568',
    background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
    pattern: '/patterns/legal-watermark.svg',
  },
};

export default function PDFViewer({ 
  fileUrl, 
  documentData, 
  allowDownload,
  theme 
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  const currentTheme = themeStyles[theme];

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  return (
    <div 
      className="pdf-viewer-container"
      style={{
        background: currentTheme.background,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Background Pattern */}
      <div 
        className="background-pattern"
        style={{
          backgroundImage: `url(${currentTheme.pattern})`,
          opacity: 0.05,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Watermark */}
      <div className="watermark-overlay" style={{ zIndex: 1 }}>
        <span style={{ 
          color: currentTheme.primary,
          opacity: 0.08,
          fontSize: '4rem',
          fontWeight: 'bold',
          transform: 'rotate(-45deg)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          whiteSpace: 'nowrap',
        }}>
          DOĞRULANMIŞTIR
        </span>
      </div>

      {/* PDF Document */}
      <div className="relative z-10">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-900"></div>
              <p className="mt-4 text-gray-600">Belge yükleniyor...</p>
            </div>
          }
          error={
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <p className="text-red-600 text-lg font-semibold">Belge yüklenirken hata oluştu</p>
              <p className="text-gray-600 mt-2">Lütfen daha sonra tekrar deneyin</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-2xl rounded-lg overflow-hidden my-8"
          />
        </Document>
      </div>

      {/* Navigation Controls */}
      <div className="pdf-controls sticky bottom-0 bg-white shadow-lg rounded-t-lg p-4 z-20">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Sayfa Navigasyonu */}
          <button 
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(prev => prev - 1)}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
            style={{ backgroundColor: currentTheme.primary }}
          >
            ← Önceki
          </button>
          
          <span className="text-gray-700 font-medium">
            Sayfa {pageNumber} / {numPages || '?'}
          </span>
          
          <button 
            disabled={pageNumber >= (numPages || 1)}
            onClick={() => setPageNumber(prev => prev + 1)}
            className="px-4 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
            style={{ backgroundColor: currentTheme.primary }}
          >
            Sonraki →
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2 ml-4 border-l pl-4 border-gray-300">
            <button 
              onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all"
            >
              🔍-
            </button>
            <span className="text-gray-700 font-medium min-w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button 
              onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all"
            >
              🔍+
            </button>
          </div>

          {/* Download Button */}
          {allowDownload && (
            <a 
              href={fileUrl} 
              download={documentData.title}
              className="ml-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              ⬇️ PDF İndir
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
