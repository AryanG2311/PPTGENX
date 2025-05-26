'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, Target } from 'lucide-react';
import { useMemo } from 'react';

export default function HomePage() {
  const router = useRouter();

  // Generate consistent random positions for background elements
  const backgroundElements = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 37) % 100}%`,
      top: `${(i * 23) % 100}%`,
      duration: `${5 + (i * 7) % 10}s`,
      delay: `${-(i * 13) % 5}s`,
    }));
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#6A11CB] via-[#2575FC] to-[#00D4FF]
 px-4 text-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundElements.map((element, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: element.left,
              top: element.top,
              animation: `float ${element.duration} linear infinite`,
              animationDelay: element.delay,
            }}
          >
            <div className="w-3 h-3 bg-white/10 rounded-full blur-sm" />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <motion.h1
          className="text-6xl font-bold mb-2 text-white tracking-tight"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          Hackathon PPT Generator
          <Sparkles className="inline-block ml-2 animate-pulse" />
        </motion.h1>
        
        <motion.p
          className="text-xl text-white/90 mb-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Instantly create stunning pitch decks for your hackathon project ✨
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255,255,255,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/generate/quick')}
            className="group relative px-8 py-4 rounded-2xl bg-white text-violet-600 font-semibold text-lg hover:bg-white/95 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <Rocket className="inline-block mr-2 -mt-1 animate-bounce" size={20} />
            Urgent PPT
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255,255,255,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/generate/custom')}
            className="group relative px-8 py-4 rounded-2xl bg-purple-900/30 backdrop-blur-sm text-white font-semibold text-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <Target className="inline-block mr-2 -mt-1 group-hover:rotate-180 transition-transform duration-500" size={20} />
            Custom PPT
          </motion.button>
        </div>
      </motion.div>

      {/* Animated corner decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-t from-purple-600 to-transparent opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-b from-fuchsia-600 to-transparent opacity-20 rounded-full blur-3xl animate-pulse delay-1000" />
    </main>
  );
}