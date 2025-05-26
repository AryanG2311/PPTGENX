'use client';
import React from "react";

import InputField from '@/components/InputField';
import { useState } from "react";
import {  useRef, useEffect } from 'react';
import { RocketIcon, Code, Server, Database, Cpu, Layers, Monitor, Zap } from 'lucide-react';
import axios from 'axios';
import SlideCard from '@/components/SlideCard';
import { generatePptxFromSlides } from '@/lib/pptGenerator';
import QuickForm from '@/components/QuickForm';
import ThemeModal from '@/components/ThemeModal';
import MvpUpload from '@/components/MvpUpload';
import GenerateButton from '@/components/GenerateButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import LinkedInAutoPost from '@/components/LinkedInAutoPost';
import { TechIcons } from '@/components/TechIcons';
import ScriptTimeEstimator from '@/components/ScriptTimeEstimator';

export type ThemeOption = "tech" | "vibrant" | "minimal" | "modern";

const themeOptions: ThemeOption[] = ["tech", "vibrant", "minimal", "modern"];

interface Slide {
  title: string;
  content: string;
  type?: 'problem' | 'solution' | 'tech' | 'market' | 'team' | 'traction' | 'vision';
}

export default function QuickGeneratePage() {
  const [formData, setFormData] = useState({
    teamName: '',
    hackathonName: '',
    problemStatement: '',
    solution: '',
    usp: '',
    techStack: '',
    mvpScreenshot: null as File | null,
  });
  const previewRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const goToSlide = (index: number) => {
    const targetSlide = slideRefs.current[index];
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setCurrentSlide(index);
  };
  
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState<Slide[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('tech');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postToLinkedIn, setPostToLinkedIn] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'mvpScreenshot' && 'files' in e.target) {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        setFormData((prev) => ({ ...prev, mvpScreenshot: files[0] }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    setShowThemeModal(true);
  };

  const handleConfirmTheme = async () => {
    console.log('Selected theme:', selectedTheme);
    setShowThemeModal(false);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/quick', {
        projectName: formData.teamName,
        solution: formData.solution,
        problem: formData.problemStatement,
        usp: formData.usp,
        theme: selectedTheme,
      });

      setSlides(response.data.slides);
    } catch (error: any) {
      console.error('Unexpected error:', error);
      setError(error.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slides && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [slides]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Tech Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.25' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Circuit lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <path d="M100,0 L0,100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <path d="M50,0 L50,100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <path d="M0,50 L100,50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        </svg>
      </div>
      
      {/* Floating tech icons */}
      <TechIcons />
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-white/[0.03]" />
      
      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Glowing orbs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        
        <motion.div 
          className="relative bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 ring-1 ring-blue-500/20 border border-blue-500/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tech decoration elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 rounded-full opacity-30 blur-md"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500 rounded-full opacity-30 blur-md"></div>
          
          <div className="flex items-center justify-between mb-8">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-blue-400" />
            </motion.div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to Your <span className="text-blue-400">Tech</span> Space
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <QuickForm onChange={handleChange} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <GenerateButton onClick={handleGenerate} loading={loading} task={"Generate PPT"} />
          </motion.div>

          {error && (
            <motion.p 
              className="text-red-400 mt-4 p-3 rounded-lg bg-red-900/30 border border-red-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.p>
          )}

          <AnimatePresence>
            {slides && (
              <motion.div 
                ref={previewRef} 
                className="mt-10 space-y-6 relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
              >
            <div className="flex items-center justify-between mb-2">
  <h2 className="text-2xl font-semibold text-cyan-500">
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.5, 1] }}
      transition={{ duration: 2, delay: 0.2 }}
    >
      Content-Preview
    </motion.span>
  </h2>

  {slides && slides.length > 0 && (
    <ScriptTimeEstimator slides={slides} />
  )}
</div>


                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900/30">
                  {slides.map((slide, index) => (
                    <motion.div
                      key={index}
                      ref={(el) => {
                        slideRefs.current[index] = el;
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" 
                      }}
                      className="rounded-xl transition-all duration-300 transform hover:translate-y-[-5px] ring-1 ring-blue-500/20 hover:ring-blue-400/40"
                    >
                      <SlideCard
                        title={slide.title}
                        content={slide.content}
                        type={slide.type}
                        themeColor={selectedTheme}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="sticky bottom-0 bg-black/70 backdrop-blur-md py-4 border-t border-blue-900/30 rounded-b-xl">
                  <div className="flex justify-center items-center space-x-3">
                    {slides.map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        onClick={() => goToSlide(index)}
                        className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 flex items-center justify-center
                          ${currentSlide === index 
                            ? 'text-white ring-2 ring-offset-2 ring-offset-black ring-blue-400 shadow-lg shadow-blue-500/30' 
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
                          }`}
                        style={{
                          backgroundColor: currentSlide === index ? `#4338ca` : undefined,
                        }}
                      >
                        {index + 1}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <GenerateButton
                    onClick={() => slides && generatePptxFromSlides(
                      slides,
                      formData.teamName,
                      selectedTheme,
                      formData.teamName
                    )}
                    loading={loading}
                    task={"Download PPT"}
                  />
                    <GenerateButton 
  onClick={() => setPostToLinkedIn(true)}
  loading={loading}
  task={"Post on LinkedIn"}
/>

{postToLinkedIn && (
  <LinkedInAutoPost
    teamName={formData.teamName}
    hackathonName={formData.hackathonName}  
    usp={formData.usp}
    projectName={formData.teamName}
/>
)}

                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>

          <ThemeModal
            show={showThemeModal}
            selectedTheme={selectedTheme}
            onClose={() => setShowThemeModal(false)}
            onConfirm={handleConfirmTheme}
            onSelect={(theme) => setSelectedTheme(theme as ThemeOption)}
          />
        </motion.div>
      </div>
    </div>
  );
}