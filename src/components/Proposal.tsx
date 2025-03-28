import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/proposal.css';

interface Heart {
  id: number;
  left: string;
  animationDuration: string;
}

function Proposal() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [noButtonTries, setNoButtonTries] = useState<number>(0);
  const [showMessageSaved, setShowMessageSaved] = useState<boolean>(false);

  // Falling Hearts Animation
  useEffect(() => {
    let heartId = 0;

    const createHeart = () => {
      const newHeart: Heart = {
        id: heartId++,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      };

      setHearts((prevHearts) => [...prevHearts, newHeart]);

      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
      }, parseFloat(newHeart.animationDuration) * 1000);
    };

    const heartInterval = setInterval(createHeart, 500);
    return () => clearInterval(heartInterval);
  }, []);

  const handleMouseEnter = () => {
    const maxX = window.innerWidth * 0.8;
    const maxY = window.innerHeight * 0.8;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setPosition({ x: newX, y: newY });
    setNoButtonTries((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (message.trim() === '') {
      alert('Please write a sweet message first! 💕');
      return;
    }
    console.log('Message submitted:', message);
    setShowMessageSaved(true);
    setTimeout(() => setShowMessageSaved(false), 2000);
  };

  const handleYesClick = () => {
    console.log('Yes button clicked, message:', message);
    if (message.trim() === '') {
      alert('Please write and submit a sweet message first! 💕');
      return;
    }
    console.log('Navigating to /locked-up');
    try {
      navigate(`/locked-up?message=${encodeURIComponent(message)}`);
    } catch (error) {
      console.error('Navigation failed:', error);
      window.location.href = `/locked-up?message=${encodeURIComponent(message)}`;
    }
    console.log('Navigation called');
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="container proposal-page">
      <div className="glass-box">
        <h1>Forever? 💍</h1>
        <p>Tell me something sweet before you answer... 🥰</p>
        <div className="message-input">
          <input
            type="text"
            placeholder="Write your heart out... 💌"
            value={message}
            onChange={(e) => {
              console.log('Input value:', e.target.value);
              setMessage(e.target.value);
            }}
          />
          <button type="button" onClick={handleSubmit}>Submit 💕</button>
          {showMessageSaved && <div className="message-saved">Message Saved! 💌</div>}
        </div>
        <p>Will you be mine forever? ❤️</p>
        <div className="buttons">
          <button type="button" className="btn yes-btn" onClick={handleYesClick}>
            Yes 🥳
          </button>
          <button
            type="button"
            className="btn no-btn"
            onMouseEnter={handleMouseEnter}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: 'transform 0.3s ease',
            }}
          >
            No 😜
          </button>
        </div>
        {noButtonTries >= 3 && (
          <p className="funny-message">Aww, stop teasing me! Say Yes already! 😜💕</p>
        )}
        <div className="hearts">💖💖💖</div>
      </div>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="falling-heart"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
          }}
        >
          💖
        </div>
      ))}
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
        />
        <button type="button" onClick={toggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
      <div className="nav-buttons">
        <button type="button" onClick={() => navigate('/home')} className="btn">Home 🏠</button>
        <button type="button" onClick={() => window.history.back()} className="btn">Back ⬅️</button>
      </div>
    </div>
  );
}

export default Proposal;