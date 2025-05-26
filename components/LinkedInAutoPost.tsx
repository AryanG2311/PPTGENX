'use client';

import { useEffect } from 'react';

interface LinkedInAutoPostProps {
  teamName: string;
  hackathonName: string;
  usp: string;
  projectName: string;
}

const LinkedInAutoPost: React.FC<LinkedInAutoPostProps> = ({
  teamName,
  hackathonName,
  usp,
}) => {
  useEffect(() => {
    const postText = `🚀 Just built a increadible project at ${hackathonName} with team ${teamName}! 💡\n\n${usp}\n\n#Hackathon #Innovation #PitchDeck #AI #Builders`;

    navigator.clipboard.writeText(postText)
      .then(() => {
        window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank');
      })
      .catch((err) => {
        alert("Failed to copy post to clipboard.");
        console.error(err);
      });
  }, [teamName, hackathonName, usp]);

  return null;
};

export default LinkedInAutoPost;
