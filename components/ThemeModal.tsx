import React from 'react';
import { motion } from 'framer-motion';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  darkText: string;
  titleFont: string;
  bodyFont: string;
  chartColors: string[];
}

interface Themes {
  [key: string]: ThemeColors;
}

const themes: Themes = {
  tech: {
    primary: "0A1128",
    secondary: "001F54",
    accent: "00A6FB",
    text: "FFFFFF",
    darkText: "1A1A1A",
    titleFont: "Montserrat",
    bodyFont: "Roboto",
    chartColors: ["00A6FB", "0582CA", "006494", "003554", "051923"]
  },
  vibrant: {
    primary: "7209B7",
    secondary: "560BAD",
    accent: "4CC9F0",
    text: "FFFFFF",
    darkText: "1A1A1A",
    titleFont: "Poppins",
    bodyFont: "Nunito",
    chartColors: ["4CC9F0", "4895EF", "4361EE", "3F37C9", "3A0CA3"]
  },
  minimal: {
    primary: "111827",
    secondary: "1F2937",
    accent: "10B981",
    text: "FFFFFF",
    darkText: "333333",
    titleFont: "Helvetica",
    bodyFont: "Helvetica",
    chartColors: ["10B981", "059669", "047857", "065F46", "064E3B"]
  },
  modern: {
    primary: "1F2937",
    secondary: "374151",
    accent: "3B82F6",
    text: "FFFFFF",
    darkText: "2C3E50",
    titleFont: "Montserrat",
    bodyFont: "Open Sans",
    chartColors: ["3B82F6", "2563EB", "1D4ED8", "1E40AF", "1E3A8A"]
  }
};

type ThemeModalProps = {
  show: boolean;
  selectedTheme: string;
  onClose: () => void;
  onConfirm: () => void;
  onSelect: (theme: string) => void;
};

const ThemeModal: React.FC<ThemeModalProps> = ({
  show,
  selectedTheme,
  onClose,
  onConfirm,
  onSelect,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[480px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Theme</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(themes).map(([themeName, themeColors]) => (
            <motion.div
              key={themeName}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(themeName)}
              className={`
                relative p-4 rounded-xl cursor-pointer transition-all duration-200
                ${selectedTheme === themeName 
                  ? 'ring-2 ring-[#${themeColors.accent}] ring-offset-2' 
                  : 'hover:shadow-lg'
                }
              `}
              style={{
                background: `linear-gradient(135deg, #${themeColors.primary}, #${themeColors.secondary})`
              }}
            >
              <div 
                className="h-24 rounded-lg mb-3"
                style={{
                  background: `linear-gradient(135deg, #${themeColors.accent}40, transparent)`
                }}
              />
              <span 
                className="font-medium capitalize drop-shadow-sm"
                style={{ color: `#${themeColors.text}` }}
              >
                {themeName}
              </span>
              {selectedTheme === themeName && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full 
                    flex items-center justify-center shadow-md"
                >
                  <svg 
                    className="w-4 h-4"
                    style={{ color: `#${themeColors.accent}` }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium
              hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg text-white font-medium
              transition-colors duration-200"
            style={{
              backgroundColor: `#${themes[selectedTheme]?.accent || '3B82F6'}`,
              color: `#${themes[selectedTheme]?.text || 'FFFFFF'}`
            }}
          >
            Apply Theme
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeModal;