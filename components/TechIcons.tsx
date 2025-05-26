'use client';

import { motion } from 'framer-motion';
import { Code, Server, Database, Cpu, Layers, Monitor, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const iconList = [Code, Server, Database, Cpu, Layers, Monitor, Zap];

interface IconProps {
  x: number;
  y: number;
  size: number;
  scale: number;
  duration: number;
  Icon: React.ElementType;
}

export const TechIcons = () => {
  const [iconsData, setIconsData] = useState<IconProps[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newIcons = iconList.map((Icon) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 24 + Math.floor(Math.random() * 48),
        scale: 0.5 + Math.random() * 1.5,
        duration: 15 + Math.random() * 20,
        Icon,
      }));

      setIconsData(newIcons);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {iconsData.map(({ x, y, size, scale, duration, Icon }, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500/20"
          initial={{ opacity: 0.5, scale }}
          animate={{
            x: [null, x],
            y: [null, y],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
};
