"use client";

import ServiceCard from '@/components/ServiceCard';
import { Sparkles, Hand, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
          운명을 마주하다
        </h1>
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
          당신의 미래, 숨겨진 재능, 그리고 마음속 깊은 고민까지.<br/>
          신비의 서가 당신에게 해답을 제시합니다.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ServiceCard
            title="정통 사주"
            description="30년 경력 전문가의 비법으로 당신의 타고난 운명과 흐름을 분석해드립니다."
            href="/saju"
            icon={Sparkles}
            color="text-yellow-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ServiceCard
            title="손금 분석"
            description="손바닥에 새겨진 인생의 지도. 당신의 과거와 현재, 그리고 미래를 읽어드립니다."
            href="/palmistry"
            icon={Hand}
            color="text-pink-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ServiceCard
            title="고민 해결책"
            description="말 못 할 고민이 있나요? 신비의 책이 당신에게 꼭 필요한 한마디를 전합니다."
            href="/book"
            icon={BookOpen}
            color="text-blue-400"
          />
        </motion.div>
      </div>
    </div>
  );
}