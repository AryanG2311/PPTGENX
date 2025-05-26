'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, Target, Zap, Code, Trophy, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';

export default function HomePage() {
  const router = useRouter();

  // Generate consistent random positions for background elements
  const backgroundElements = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      left: `${(i * 37) % 100}%`,
      top: `${(i * 23) % 100}%`,
      duration: `${8 + (i * 7) % 15}s`,
      delay: `${-(i * 13) % 8}s`,
      size: i % 3 === 0 ? 'large' : i % 2 === 0 ? 'medium' : 'small',
    }));
  }, []);

  const floatingIcons = useMemo(() => {
    const icons = [Code, Trophy, Zap, Sparkles, Target];
    return Array.from({ length: 8 }, (_, i) => ({
      Icon: icons[i % icons.length],
      left: `${(i * 47) % 90 + 5}%`,
      top: `${(i * 31) % 80 + 10}%`,
      duration: `${12 + (i * 5) % 8}s`,
      delay: `${-(i * 17) % 6}s`,
    }));
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 text-center overflow-hidden">
      {/* Enhanced animated background with grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundElements.map((element, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: element.left,
              top: element.top,
              animation: `float-complex ${element.duration} ease-in-out infinite`,
              animationDelay: element.delay,
            }}
          >
            <div 
              className={`bg-gradient-to-br from-white/20 to-purple-300/30 rounded-full backdrop-blur-sm ${
                element.size === 'large' ? 'w-4 h-4' : 
                element.size === 'medium' ? 'w-3 h-3' : 'w-2 h-2'
              } shadow-lg`} 
            />
          </div>
        ))}
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: item.left,
              top: item.top,
              animation: `float-slow ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
            }}
          >
            <item.Icon size={24} className="text-white" />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 mr-2 text-purple-300" />
          <span className="text-sm font-medium text-purple-200">AI-Powered Presentation Generator</span>
        </motion.div>

        {/* Main heading with enhanced typography */}
        <motion.h1
          className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight tracking-tight"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.3
          }}
        >
          Hackathon
          <br />
          <span className="relative">
            PPT Generator
            <motion.div
              className="absolute -right-4 -top-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </motion.div>
          </span>
        </motion.h1>
        
        {/* Enhanced subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Transform your hackathon ideas into 
          <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> stunning presentations </span>
          in seconds with our AI-powered generator ✨
        </motion.p>

        {/* Enhanced CTA buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/generate/quick')}
            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-pulse" />
            <span className="relative flex items-center justify-center">
              <Rocket className="mr-3 group-hover:animate-bounce" size={22} />
              Urgent PPT
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="group relative px-10 py-5 rounded-2xl bg-slate-800/50 backdrop-blur-xl text-white font-bold text-lg border-2 border-slate-600/50 hover:border-purple-400/50 hover:bg-slate-700/50 transition-all duration-300 min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center">
              <Target className="mr-3 group-hover:rotate-180 transition-transform duration-500" size={22} />
              Custom PPT
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </span>
          </motion.button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Generate presentations in under 60 seconds" },
            { icon: Sparkles, title: "AI-Powered", desc: "Smart content generation and design optimization" },
            { icon: Trophy, title: "Hackathon Ready", desc: "Perfectly crafted for competition presentations" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="group p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-700/30 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <feature.icon className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes float-complex {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(-10px) translateX(-10px) rotate(180deg); }
          75% { transform: translateY(-30px) translateX(5px) rotate(270deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}