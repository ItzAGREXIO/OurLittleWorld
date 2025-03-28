import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/quiz.css';

function Quiz() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const questions = [
    { question: 'What’s my fave pizza topping?', answer: 'pepperoni' },
    { question: 'Which K-drama did we watch first?', answer: 'crash landing on you' },
    { question: 'Where did we first meet?', answer: 'cafe' },
  ];

  const handleSubmit = () => {
    if (answer.toLowerCase() === questions[currentQuestion].answer) {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
        setResult('Correct! Next question... 🎉');
      } else {
        setResult('You nailed it! Here’s your reward! 💖');
        setTimeout(() => navigate('/secret'), 2000);
      }
    } else {
      setResult('Oops! Try again... 😜');
    }
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
        <h1>Quiz Time! 🌟</h1>
        <p>Let’s see how well you know me!</p>
        <div id="question">{questions[currentQuestion].question}</div>
        <input
          id="answer"
          type="text"
          placeholder="Your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>Submit</button>
        {result && <div id="result">{result}</div>}
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

export default Quiz;