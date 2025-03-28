import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/entryGame.css';

function EntryGame() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    const maxX = window.innerWidth * 0.8;
    const maxY = window.innerHeight * 0.8;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setPosition({ x: newX, y: newY });
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
    <div className="container entry-game">
      <div className="glass-box">
        <h1>Hey Cutie! ❤️</h1>
        <p>Do you wanna really go more in?</p>
        <div className="buttons">
          <button type="button" className="btn" onClick={() => navigate('/quiz-gate')}>
            Yes 😊
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
      </div>
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
    </div>
  );
}

export default EntryGame;