import { Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', container: 'w-8 h-8' },
    md: { icon: 'w-8 h-8', text: 'text-xl', container: 'w-10 h-10' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', container: 'w-14 h-14' },
  };

  const { icon: iconSize, text: textSize, container: containerSize } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${containerSize} bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center shadow-md`}>
        <Shield className={`${iconSize} text-white`} strokeWidth={2.5} />
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
