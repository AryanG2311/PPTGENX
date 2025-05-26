import React from 'react';
import InputField from './InputField';
import { Users, Trophy, HelpCircle, Lightbulb, Star, Code } from 'lucide-react';

interface FormData {
  teamName?: string;
  hackathonName?: string;
  problemStatement?: string;
  solution?: string;
  usp?: string;
  techStack?: string;
  mvpScreenshot?: File | null;
}

interface QuickFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formData?: FormData;
}

const QuickForm: React.FC<QuickFormProps> = ({ onChange, formData = {} }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <InputField
            label="Team Name"
            name="teamName"
            value={formData.teamName || ''}
            onChange={onChange}
            placeholder="Your awesome team name"
            icon={Users}
          />
          
          <InputField
            label="Hackathon Name"
            name="hackathonName"
            value={formData.hackathonName || ''}
            onChange={onChange}
            placeholder="Hackathon event name"
            icon={Trophy}
          />
        </div>
        
        <div className="space-y-6">
          <InputField
            label="Problem Statement"
            name="problemStatement"
            value={formData.problemStatement || ''}
            onChange={onChange}
            placeholder="What problem are you solving?"
            icon={HelpCircle}
          />
          
          <InputField
            label="Solution"
            name="solution"
            value={formData.solution || ''}
            onChange={onChange}
            placeholder="How does your project solve it?"
            icon={Lightbulb}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Unique Selling Point"
          name="usp"
          value={formData.usp || ''}
          onChange={onChange}
          placeholder="What makes your solution stand out?"
          icon={Star}
        />
        
   
      </div>
    </div>
  );
};

export default QuickForm;