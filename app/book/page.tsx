"use client";

import { useState, useEffect, useRef } from 'react';
import { gominList } from '@/lib/gominList';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Sparkles } from 'lucide-react';

export default function BookPage() {
  const [state, setState] = useState<'idle' | 'holding' | 'revealed'>('idle');
  const [quote, setQuote] = useState<string>('');
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const startHolding = () => {
    if (state === 'revealed') {
      reset();
      return;
    }
    setState('holding');
  };

  const stopHolding = () => {
    if (state !== 'holding') return;
    
    // Pick a random quote
    const randomQuote = gominList[Math.floor(Math.random() * gominList.length)];
    setQuote(randomQuote);
    setState('revealed');
  };

  const reset = () => {
    setState('idle');
    setQuote('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 text-center px-4">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">마법의 고민 해결책</h1>
        <p className="text-white/60 max-w-md mx-auto">
          마음속으로 고민을 깊게 생각하며 아래 책에 손을 올리세요.<br/>
          그리고 준비가 되면 손을 떼세요.
        </p>
      </div>

      <div className="relative w-64 h-80 perspective-1000">
        <AnimatePresence mode="wait">
          {state !== 'revealed' ? (
            <motion.div
              key="closed-book"
              className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-r-2xl rounded-l-md shadow-2xl border-l-8 border-indigo-950 flex items-center justify-center cursor-pointer select-none"
              initial={{ rotateY: 0 }}
              animate={state === 'holding' ? { 
                scale: 1.05,
                x: [0, -2, 2, -2, 2, 0],
                transition: { repeat: Infinity, duration: 0.2 }
              } : { scale: 1 }}
              exit={{ rotateY: -180, opacity: 0, transition: { duration: 0.5 } }}
              onMouseDown={startHolding}
              onMouseUp={stopHolding}
              onTouchStart={startHolding}
              onTouchEnd={stopHolding}
            >
              <div className="border-2 border-yellow-500/30 p-8 rounded-lg h-5/6 w-5/6 flex flex-col items-center justify-center">
                 <Book size={64} className="text-yellow-500/50 mb-4" />
                 <div className="text-yellow-500/50 font-serif text-xl">The Book<br/>of<br/>Answers</div>
              </div>
              
              {state === 'idle' && (
                <div className="absolute -bottom-16 text-sm text-white/50 animate-bounce">
                  책을 꾹 누르세요
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="open-book"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute inset-0 bg-[#fdfbf7] rounded-md shadow-[0_0_50px_rgba(255,255,255,0.2)] text-slate-800 p-8 flex flex-col items-center justify-center overflow-hidden"
              onClick={reset}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 pointer-events-none"></div>
              <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-slate-200"></div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative z-10 text-center"
              >
                <Sparkles className="mx-auto text-purple-500 mb-4 w-8 h-8" />
                <p className="font-serif text-xl font-bold leading-relaxed break-keep">
                  {quote}
                </p>
                <div className="mt-8 text-xs text-slate-400 font-sans">
                  터치하여 다시 닫기
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
