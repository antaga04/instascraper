import React from 'react';
import ShareButton from './ShareButton';

const ResultDisplay = ({ text }) => {
  return (
    <div id='note'>
      <ShareButton text={text} />
      <p dangerouslySetInnerHTML={{ __html: text }}></p>
    </div>
  );
};

export default ResultDisplay;
