import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-purple-300 transition-colors">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <span>신비의 서</span>
        </Link>
        
        <nav className="flex gap-4 sm:gap-6 text-sm sm:text-base">
          <Link href="/saju" className="hover:text-purple-300 transition-colors">사주</Link>
          <Link href="/palmistry" className="hover:text-purple-300 transition-colors">손금</Link>
          <Link href="/book" className="hover:text-purple-300 transition-colors">해결의 책</Link>
        </nav>
      </div>
    </header>
  );
}
