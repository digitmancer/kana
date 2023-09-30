import { useContext, useEffect, useRef, useState } from 'react';
import { ConfigContext } from './configProvider';
import { romanizations } from '../kana';
import { hiragana, katakana } from '../userdata';

function AnswerField({ containerRef, romaji, onRightAnswer })
{
  const inputRef = useRef();
  const [input, setInput] = useState('');
  const [missed, setMissed] = useState(false);
  const [config] = useContext(ConfigContext);

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
    onRightAnswer();
    setMissed(false);
    setInput('');
  };

  const handleWrongAnswer = () =>
  {
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
  const questions = { ...hiragana, ...katakana };
  const totalWeight = 
    Object.values(questions).reduce((total, weight) => total + weight, 0);

  let index = totalWeight * Math.random();
  const [kana] = 
    Object.entries(questions).find(([_, weight]) => 
    {
      index -= weight;
      return (index <= 0);
    });

  return {
    kana:   kana,
    romaji: romanizations[kana]
  };
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
        {question.kana}
      </div>
      <AnswerField 
        containerRef={containerRef}
        romaji={question.romaji} 
        onRightAnswer={getNewQuestion}
      />
    </div>
  )
}