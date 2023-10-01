import { useContext, useEffect, useRef, useState } from 'react';
import { ConfigContext } from './configProvider';
import { romanizations } from '../kana';

function AnswerField({ containerRef, kana, onRightAnswer })
{
  const inputRef = useRef();
  const [input, setInput] = useState('');
  const [missed, setMissed] = useState(false);
  const [config] = useContext(ConfigContext);

  const romaji = romanizations[kana];
  const pronunciation = new Audio(`/audio/${config.voice}/${romaji.nihon}.mp3`);

  useEffect(() => 
  {
    const focusInput = () => inputRef.current.focus({ preventScroll: true });
    containerRef.current.addEventListener('click', focusInput);
    focusInput();
  }, []);

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

  const handleRightAnswer = () =>
  {
    if (!missed)
      decreaseWeight(kana);

    onRightAnswer();
    setMissed(false);
    setInput('');
  };

  const handleWrongAnswer = () =>
  {
    if (!missed)
      increaseWeight(kana);

    pronunciation.play();
    setMissed(true);
    setInput('');
  };

  return (
    <input 
      className="answer"
      type="text"
      value={input}
      ref={inputRef}
      placeholder={missed ? romaji[config.romanization] : ''}
      onChange={handleInput}
      autoComplete="nope"
    />
  )
}

function getQuestion()
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

function loadWeights()
{
  let weights = localStorage.getItem('userData');
  if (weights)
    return JSON.parse(weights);

  weights = 
    Object.keys(romanizations).reduce((list, kana) => 
    {
      list[kana] = 1.0;
      return list;
    }, {});

  storeWeights(weights);
  return weights;
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
  const containerRef = useRef();
  const [question, setQuestion] = useState(getQuestion());
  const getNewQuestion = () => setQuestion(getQuestion());

  return (
    <div 
      className="quiz"
      ref={containerRef}
    >
      <div className="prompt">
        {question}
      </div>
      <AnswerField 
        containerRef={containerRef}
        kana={question} 
        onRightAnswer={getNewQuestion}
      />
    </div>
  )
}