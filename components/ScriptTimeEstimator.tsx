'use client';

import React from 'react';

interface Slide {
  title: string;
  content: string;
}

interface ScriptTimeEstimatorProps {
  slides: Slide[];
}

const ScriptTimeEstimator: React.FC<ScriptTimeEstimatorProps> = ({ slides }) => {
  const totalWords = slides.reduce((count, slide) => {
    return count + slide.title.split(' ').length + slide.content.split(' ').length;
  }, 0);

  const wordsPerMinute = 130;
  const estimatedMinutes = totalWords / wordsPerMinute;
  const minutes = Math.floor(estimatedMinutes);
  const seconds = Math.round((estimatedMinutes - minutes) * 60);

  return (
    <div className="mt-4  text-cyan-7   00 text-sm">
      🗣️ Estimated Pitch Time: <strong>{minutes} min {seconds} sec</strong>
    </div>
  );
};

export default ScriptTimeEstimator;
