import React from 'react';
import { toast } from 'sonner';

const ShareButton = ({ text }) => {
  const handleShare = async () => {
    const plainText = text.replace(/<br>/g, '\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Note',
          text: plainText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard(plainText);
      toast.warning('Web Share API not supported in this browser.');
      toast.info('Text copied to clipboard.');
    }
  };

  const copyToClipboard = (plainText) => {
    navigator.clipboard
      .writeText(plainText)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Could not copy text:', error);
      });
  };

  return <button className='btn' onClick={handleShare}>Import as Note</button>;
};

export default ShareButton;
