// JournalPage.js
import React from 'react';
import './JournalPage.css';

const JournalPage = ({ title, content}) => {

  const getFontSize=(content)=>{
    const len=content.length;
    if(len<500) return 18;
    if(len<1000) return 16;
    if(len<1500) return 14;
    if(len<2000) return 12;
    return 10;
  }

    const fontsize=getFontSize(content);
    
  return (
    <div className="journal-page">
      <h2>{title}</h2>
      <p style={{fontSize:`${fontsize}px`}}>{content}</p>
    </div>
  );
};

export default JournalPage;
