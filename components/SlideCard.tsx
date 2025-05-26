import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  AlertCircle, 
  Wrench, 
  Target, 
  Users, 
  Trophy,
  Rocket,
  type LucideIcon
} from 'lucide-react';

interface SlideCardProps {
  title: string;
  content: string | boolean;
  type?: 'problem' | 'solution' | 'tech' | 'market' | 'team' | 'traction' | 'vision';
  themeColor?: string;
}

const slideIcons: Record<string, LucideIcon> = {
  problem: AlertCircle,
  solution: Lightbulb,
  tech: Wrench,
  market: Target,
  team: Users,
  traction: Trophy,
  vision: Rocket
};

export default function SlideCard({ 
  title, 
  content, 
  type,
  themeColor = '3B82F6' // Default blue if no theme color provided
}: SlideCardProps) {
  const Icon = type ? slideIcons[type] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex bg-white rounded-xl shadow-md hover:shadow-lg
        transition-shadow duration-300 overflow-hidden"
    >
      {/* Vertical accent bar */}
      <div 
        className="w-2 h-full"
        style={{ backgroundColor: `#${themeColor}` }}
      />

      <div className="flex-1 p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 leading-tight tracking-tight">
            {title}
          </h3>
          
          {Icon && (
            <div 
              className="p-2 rounded-full"
              style={{ color: `#${themeColor}` }}
            >
              <Icon size={24} strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Subtle divider */}
        <div 
          className="h-px w-full mb-4 opacity-20"
          style={{ backgroundColor: `#${themeColor}` }}
        />

        <div className="prose prose-slate max-w-none">
          {content ? (
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          ) : (
            <p className="text-gray-400 italic">
              No content generated.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}