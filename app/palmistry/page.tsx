"use client";

import { useState, useRef } from 'react';
import { analyzePalm, PalmResult } from '@/lib/palmistryLogic';
import { motion } from 'framer-motion';
import { Upload, Camera, RefreshCw, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function PalmistryPage() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PalmResult | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    const analysis = await analyzePalm(image);
    setResult(analysis);
    setLoading(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setImage(null);
    setPreviewUrl(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">AI 손금 분석</h1>
        <p className="text-white/60">손바닥 사진을 올리면 AI가 당신의 인생 지도를 분석합니다.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Upload Section */}
        <div className="space-y-4">
          <motion.div 
            onClick={triggerFileInput}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition-colors ${previewUrl ? 'border-purple-500/50' : 'border-white/20 hover:border-purple-400 hover:bg-white/5'}`}
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Palm preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white/60" />
                </div>
                <p className="font-medium mb-1">사진 업로드</p>
                <p className="text-xs text-white/40">클릭하여 선택하세요</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </motion.div>

          {previewUrl && !result && (
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all flex justify-center items-center gap-2"
            >
               {loading ? <RefreshCw className="animate-spin" /> : '분석 시작'}
            </button>
          )}

           {result && (
            <button 
              onClick={reset}
              className="w-full bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-all"
            >
               다른 사진 분석하기
            </button>
          )}
        </div>

        {/* Result Section */}
        <div className="min-h-[300px]">
          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
               <motion.div 
                 animate={{ 
                   scale: [1, 1.2, 1],
                   opacity: [0.5, 1, 0.5] 
                 }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="w-20 h-20 rounded-full bg-purple-500/20 blur-xl absolute"
               />
               <div className="relative z-10 text-lg font-bold">손금을 스캔중입니다...</div>
               <div className="text-sm text-white/40">생명선 측정 중...</div>
            </div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <ResultCard title="생명선 (건강/수명)" content={result.lifeLine} color="border-red-500/50" />
              <ResultCard title="두뇌선 (지능/적성)" content={result.headLine} color="border-blue-500/50" />
              <ResultCard title="감정선 (연애/성격)" content={result.heartLine} color="border-pink-500/50" />
              
              <div className="bg-white/10 rounded-xl p-5 border border-white/20 mt-4">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <AlertCircle size={20} className="text-yellow-400" /> 종합 총평
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">{result.summary}</p>
              </div>
            </motion.div>
          )}
          
          {!loading && !result && (
            <div className="h-full flex items-center justify-center text-white/30 text-sm">
              왼쪽에서 사진을 선택하고<br/>분석 버튼을 눌러주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, content, color }: { title: string, content: string, color: string }) {
  return (
    <div className={`bg-black/30 backdrop-blur border-l-4 p-4 rounded-r-xl ${color}`}>
      <h3 className="font-bold text-sm text-white/70 mb-1">{title}</h3>
      <p className="text-white/90 text-sm">{content}</p>
    </div>
  );
}
