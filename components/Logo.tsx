import Image from 'next/image';
import altLogo from '@/assets/altlogo.PNG';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', text: 'text-lg' },
    md: { container: 'w-10 h-10', text: 'text-xl' },
    lg: { container: 'w-14 h-14', text: 'text-2xl' },
  };

  const { container: containerSize, text: textSize } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${containerSize} rounded-lg flex items-center justify-center shadow-md overflow-hidden`}>
        <Image src={altLogo} alt="Logo" className="w-full h-full object-cover" />
      </div>
      {showText && (
        <div>
          <h1 className={`${textSize} font-extrabold text-slate-900 tracking-tight`}>
            DocVerify
          </h1>
          <p className="text-xs text-slate-500 font-medium -mt-0.5">
            Kurumsal Belge Doğrulama
          </p>
        </div>
      )}
    </div>
  );
}
