import { useContext, useEffect, useRef, useState } from 'react';
import { Icon, IconButton } from '@mui/material';
import { ConfigContext } from './configProvider';
import { romanizations } from '../kana';

function getRandomKana()
{
  const weights = loadWeights();
  const totalWeight = 
    Object.values(weights).reduce((total, weight) => total + weight, 0);

  let index = totalWeight * Math.random();
  const [kana] = 
    Object.entries(weights).find(([_, weight]) => 
    {
      index -= weight;
      return (index <= 0);
    });

  return kana;
}

function initializeWeights()
{
  const weights = 
    Object.keys(romanizations).reduce((list, kana) => 
    {
      list[kana] = 1.0;
      return list;
    }, {});

  storeWeights(weights);
  return weights;
}

function loadWeights()
{
  const weights = localStorage.getItem('userData');
  return weights ? JSON.parse(weights) : initializeWeights();
}

function storeWeights(weights)
{
  localStorage.setItem('userData', JSON.stringify(weights));
}

function decreaseWeight(kana)
{
  const weights = loadWeights();
  weights[kana] *= 0.8;
  storeWeights(weights);
}

function increaseWeight(kana)
{
  const weights = loadWeights();
  weights[kana] *= 1.5;
  storeWeights(weights);
}

export default function KanaQuiz()
{
  const [config] = useContext(ConfigContext);

  const [input, setInput] = useState('');
  const [missed, setMissed] = useState(false);
  const [mute, setMute] = useState(true);
  const [kana, setKana] = useState(getRandomKana());

  const containerRef = useRef();
  const inputRef = useRef();

  const romaji = romanizations[kana];
  const pronunciation = new Audio(`/audio/${config.voice}/${romaji.nihon}.mp3`);

  useEffect(() => 
  {
    const focusInput = () => inputRef.current.focus({ preventScroll: true });
    containerRef.current.addEventListener('click', focusInput);
    focusInput();
  }, []);

  const toggleMute = () => setMute(!mute);

  const handleRightAnswer = () =>
  {
    if (!missed)
      decreaseWeight(kana);

    setKana(getRandomKana());
    setMissed(false);
    setInput('');
  };

  const handleWrongAnswer = () =>
  {
    if (!missed)
      increaseWeight(kana);

    if (!mute)
      pronunciation.play();
    
    setMissed(true);
    setInput('');
  };

  const handleInput = (event) => 
  {
    const isRightAnswer = (answer) => Object.values(romaji).includes(answer);
    const value = event.target.value.toLowerCase().trim();

    if (value === 'n' && 
        isRightAnswer(value))
    {
        handleRightAnswer();
        return;
    }

    if (value.length === 3 ||
        ['a', 'e', 'i', 'o', 'u'].includes(value.charAt(value.length - 1)))
    {
      if (isRightAnswer(value))
        handleRightAnswer();
      else
        handleWrongAnswer();
      return;
    }

    setInput(value);
  };

  return (
    <div 
      className="quiz"
      ref={containerRef}
    >
      <IconButton onClick={toggleMute}>
        <Icon>
          { mute ? 'volume_off' : 'volume_up' }
        </Icon>
      </IconButton>
      <div className="prompt">{kana}</div>
      <input 
        className="answer"
        type="text"
        value={input}
        ref={inputRef}
        placeholder={missed ? romaji[config.romanization] : ''}
        onChange={handleInput}
        autoComplete="nope"
      />
    </div>
  )
}