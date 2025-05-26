import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  task:string;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, loading ,task }) => {
  return (
    <button
    onClick={onClick}
    disabled={loading}
    className={`mt-6 mr-4 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out 
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                text-white shadow-md hover:shadow-lg active:scale-[0.98]`}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Generating...
      </span>
    ) : (
      `${task}🚀`
    )}
  </button>
  
  );
};

export default GenerateButton;
