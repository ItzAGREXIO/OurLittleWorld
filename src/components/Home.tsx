import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';

function Home() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();

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
        <h1>Hey [Her Name]! ❤️</h1>
        <p>Our tiny, cute world ~ miles apart but super close!</p>
        <div className="hearts" />
        <div className="buttons">
          <Link to="/memories" className="btn">Memories 🍕</Link>
          <Link to="/lovenotes" className="btn">Love Notes ✍️</Link>
          <Link to="/countdown" className="btn">Countdown ⏳</Link>
          <Link to="/quiz" className="btn">Quiz 🌟</Link>
          <Link to="/secret" className="btn">Secret 🔒</Link>
          <Link to="/scrapbook" className="btn">Scrapbook 📖</Link>
          <Link to="/map" className="btn">Map 🌍</Link>
          <Link to="/foodie" className="btn">Foodie 🍰</Link>
          <Link to="/kdrama" className="btn">K-drama 🎬</Link>
        </div>
        {/* Added a separate div for the end button with extra spacing */}
        <div className="end-button-container">
          <Link to="/proposal" className="btn end-btn">Open This in the End</Link>
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

export default Home;