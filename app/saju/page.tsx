"use client";

import { useState } from 'react';
import { analyzeSaju, SajuInput, SajuResult } from '@/lib/sajuLogic';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw, Calendar, Clock, User } from 'lucide-react';

export default function SajuPage() {
  const [input, setInput] = useState<SajuInput>({
    birthDate: '',
    birthTime: '',
    gender: 'male'
  });
  const [result, setResult] = useState<SajuResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = analyzeSaju(input);
    setResult(analysis);
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setInput({ birthDate: '', birthTime: '', gender: 'male' });
  };

  if (result) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-yellow-500 mb-2">사주 명식 분석</h2>
              <p className="text-white/60 text-sm">귀하의 타고난 운명을 분석한 결과입니다.</p>
            </div>
            <button onClick={reset} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <RefreshCw size={16} /> 다시 보기
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <InfoBox label="일간(본원)" value={result.structure.ilgan} color="bg-blue-500/20 text-blue-300" />
            <InfoBox label="월령(계절)" value={result.structure.wolryeong} color="bg-green-500/20 text-green-300" />
            <InfoBox label="격국(그릇)" value={result.structure.gyeokguk} color="bg-red-500/20 text-red-300" />
            <InfoBox label="조후(환경)" value={result.structure.johu} color="bg-yellow-500/20 text-yellow-300" />
          </div>

          <div className="mb-8 p-4 bg-black/20 rounded-xl">
             <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.strength === '신강' ? 'bg-red-500/30 text-red-200' : 'bg-blue-500/30 text-blue-200'}`}>
                  {result.strength}
                </span>
                <h3 className="text-lg font-semibold">용신/희신 분석</h3>
             </div>
             <p className="text-white/80 leading-relaxed">
               귀하에게 가장 필요한 기운(용신)은 <span className="font-bold text-yellow-400">{result.yongsin.yongsin}</span>이며, 
               이를 돕는 기운(희신)은 <span className="font-bold text-green-400">{result.yongsin.hisin}</span>입니다. 
               반면 주의해야 할 기운(기신)은 <span className="text-red-400">{result.yongsin.gisin}</span>입니다.
             </p>
          </div>

          <Section title="성격 및 기질" content={result.analysis.personality} />
          <Section title="재물운" content={result.analysis.wealth} />
          <Section title="직업/진로" content={result.analysis.career} />
          <Section title="연애/결혼" content={result.analysis.relationship} />
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-xl font-bold mb-3 text-purple-300">운의 흐름 (대운)</h3>
            <p className="text-white/80 mb-4">{result.daeun}</p>
            
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-white/5">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span> 전문가의 조언
              </h4>
              <p className="text-white/90 italic font-medium leading-relaxed">"{result.advice}"</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">정통 사주 분석</h1>
        <p className="text-white/60">생년월일시를 입력하면 당신의 운명을 꿰뚫어 봅니다.</p>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl space-y-6"
      >
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Calendar size={16} /> 생년월일
          </label>
          <input 
            type="date" 
            required
            value={input.birthDate}
            onChange={(e) => setInput({...input, birthDate: e.target.value})}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Clock size={16} /> 태어난 시간
          </label>
          <input 
            type="time" 
            required
            value={input.birthTime}
            onChange={(e) => setInput({...input, birthTime: e.target.value})}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <User size={16} /> 성별
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setInput({...input, gender: 'male'})}
              className={`py-3 rounded-lg border transition-all ${input.gender === 'male' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-black/20 border-white/10 text-white/60 hover:bg-black/40'}`}
            >
              남성
            </button>
            <button
              type="button"
              onClick={() => setInput({...input, gender: 'female'})}
              className={`py-3 rounded-lg border transition-all ${input.gender === 'female' ? 'bg-pink-600 border-pink-400 text-white' : 'bg-black/20 border-white/10 text-white/60 hover:bg-black/40'}`}
            >
              여성
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <RefreshCw size={20} />
              </motion.div>
              천기를 읽는 중...
            </>
          ) : (
            <>
              운명 확인하기 <ChevronRight size={20} />
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
}

function InfoBox({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className={`p-4 rounded-xl text-center ${color}`}>
      <div className="text-xs opacity-70 mb-1">{label}</div>
      <div className="font-bold text-lg">{value}</div>
    </div>
  );
}

function Section({ title, content }: { title: string, content: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-purple-200 mb-2 border-l-4 border-purple-500 pl-3">{title}</h3>
      <p className="text-white/80 leading-relaxed bg-white/5 p-4 rounded-lg">{content}</p>
    </div>
  );
}
