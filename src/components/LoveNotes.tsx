import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/lovenotes.css';

function LoveNotes() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const [note, setNote] = useState<string>('');
  const [customText, setCustomText] = useState<string>('');
  const loveNotes: string[] = [
    'You’re my fave K-drama star! ✨',
    'I’d cross miles for your pizza date! 🍕',
    'You + Me = Cutest Story Ever! ❤️',
  ];

  const showLoveNote = (): void => {
    const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    setNote(customText ? `${customText} ${randomNote}` : randomNote);
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
    <div className="container">
      <div className="glass-box">
        <h1>Love Notes ✍️</h1>
        <p>A little love for you!</p>
        <div id="lovenotes">
          <input
            type="text"
            placeholder="Add your own twist!"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
          <button type="button" onClick={showLoveNote}>Get a Note</button>
          {note && <div id="love-note">{note}</div>}
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
      <div className="nav-buttons">
        <Link to="/home" className="btn">Home 🏠</Link>
        <button type="button" onClick={() => window.history.back()} className="btn">Back ⬅️</button>
      </div>
    </div>
  );
}

export default LoveNotes;