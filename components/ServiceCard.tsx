"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

export default function ServiceCard({ title, description, href, icon: Icon, color }: ServiceCardProps) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl h-full flex flex-col items-center text-center hover:bg-white/10 transition-colors shadow-lg cursor-pointer group`}
      >
        <div className={`mb-6 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${color}`}>
          <Icon size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-white/60 leading-relaxed">{description}</p>
      </motion.div>
    </Link>
  );
}
