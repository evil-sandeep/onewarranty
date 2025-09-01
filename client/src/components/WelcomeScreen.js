import React, { useEffect, useState, useRef } from 'react';

const messages = [
  ['Welcome to ', { text: ' sandeep + OneWarranty', color: 'yellow' }],
  ['Track every ', { text: 'Product’s', color: 'yellow' }],
  ['In one smart ', { text: 'Dashboard', color: 'yellow' }],
  ['Fast. ', { text: 'Easy.', color: 'yellow' }, ' Reliable'],
  ['Check warranty ', { text: 'across 100+', color: 'yellow' }],
  ['Electronic brands in one',{text:' place',color:'yellow'}]
];

function WelcomeScreen() {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef(null);

  const currentMessageParts = messages[currentMsgIndex];
  const fullMessage = currentMessageParts.map(part => typeof part === 'string' ? part : part.text).join('');
  const isLastMessage = currentMsgIndex === messages.length - 1;

  // Typing Effect
  useEffect(() => {
    if (isPaused) return;

    if (charIndex < fullMessage.length) {
      const timeout = setTimeout(() => {
        setCharIndex(prev => prev + 1);
        // playTypingSound();
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      stopTypingSound();
      if (!isLastMessage) {
        const timeout = setTimeout(() => {
          setCharIndex(0);
          setCurrentMsgIndex(prev => prev + 1);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isPaused]);

  // Adjust typing speed based on color
  useEffect(() => {
    let count = 0;
    for (let part of currentMessageParts) {
      const text = typeof part === 'string' ? part : part.text;
      const color = typeof part === 'string' ? 'black' : part.color;
      if (charIndex < count + text.length) {
        setTypingSpeed(color === 'yellow' ? 210 : 80);
        break;
      }
      count += text.length;
    }
  }, [charIndex, currentMsgIndex]);

  // Audio control
  const playTypingSound = () => {
    if (audioRef.current && !isPaused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => { });
    }
  };

  const stopTypingSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Hover to pause/resume
  const pauseTyping = () => {
    setIsPaused(true);
    stopTypingSound();
  };
  const resumeTyping = () => {
    setIsPaused(false);
  };

  // Render animated message
  const renderTypedMessage = () => {
    let remaining = charIndex;
    const elements = [];

    for (let i = 0; i < currentMessageParts.length; i++) {
      const part = currentMessageParts[i];
      const text = typeof part === 'string' ? part : part.text;
      const color = typeof part === 'string' ? 'black' : part.color;

      if (remaining <= 0) break;

      const visibleText = text.slice(0, remaining);
      remaining -= visibleText.length;

      elements.push(
        <span
          key={i}
          className={color === 'yellow' ? 'text-yellow-400' : 'text-white'}
        >
          {visibleText}
        </span>
      );
    }

    return (
      <h1 className="text-xl md:text-3xl font-bold font-mono border-r-2 border-white pr-1 whitespace-nowrap overflow-hidden">
        {elements}
      </h1>
    );
  };

  return (
    <div
      className="bg-gradient-to-br from-indigo-900 to-purple-900 h-[8vh] flex items-center justify-center px-6 text-center  shadow-lg transition duration-300"
      onMouseEnter={pauseTyping}
      onMouseLeave={resumeTyping}
    >
      {renderTypedMessage()}
      <audio
        ref={audioRef}
        src="/typing.wav"
        preload="auto"
      />
      <div
        className="absolute top-1 left-4 cursor-pointer flex items-center gap-2"
        onClick={() => window.location.reload()}
      >
        <img
          src="feviconn.png"
          alt="Logo"
          className="w-10 h-10 rounded-full shadow-lg"
        />
        <span className="text-white font-semibold text-lg hidden sm:block">
          OneWarranty
        </span>
      </div>

    </div>



  );
}

export default WelcomeScreen;
