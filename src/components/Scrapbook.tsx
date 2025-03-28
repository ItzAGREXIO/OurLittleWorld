import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/scrapbook.css';

function Scrapbook() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const pages: string[] = [
    'Our first date... 🌟',
    'That cute selfie we took! 📸',
    'Our late-night talks... 🌙',
  ];

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
        <h1>Scrapbook 📖</h1>
        <p>Our story in pages...</p>
        <div className="scrapbook-container">
          {pages.map((page, index) => (
            <div key={index} className="page">
              <p>{page}</p>
            </div>
          ))}
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

export default Scrapbook;