import { useContext, useEffect, useRef, useState } from 'react';
import { romanizations } from '../kana';
import { hiragana, katakana, hiraganaDigraphs, katakanaDigraphs } from '../userdata';
import { ConfigContext } from './configProvider';

function AnswerField({ containerRef, romaji, onRightAnswer })
{
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [missed, setMissed] = useState(false);
  const [config] = useContext(ConfigContext);

  const pronunciation = new Audio(`/audio/${config.voice}/${romaji.nihon}.mp3`);

  useEffect(() => 
  {    
    const focusInput = () => 
    {
      inputRef.current.focus({ preventScroll: true });
      handleFocus();
    }

    containerRef.current.addEventListener('click', focusInput);
    focusInput();

    return () => document.removeEventListener('click', focusInput);
  }, []);

  const handleFocus = () => 
  {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    setTimeout(() => { document.body.style.overflow = 'auto'; }, 1000);
  }

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
      onFocus={handleFocus}
      autoComplete="off"
      autoFocus
    />
  )
}

function getQuestion()
{
  const questions = 
  [
    ...hiragana, 
    ...katakana, 
    ...hiraganaDigraphs, 
    ...katakanaDigraphs
  ];

  const totalWeight = questions.reduce((total, question) => total + question.weight, 0);
  let index = totalWeight * Math.random();
  const question = questions.find(element => 
  {
    index -= element.weight;
    return index <= 0;
  });

  return {
    kana:   question.kana,
    romaji: romanizations[question.kana]
  };
}

export default function KanaQuiz()
{
  const wrapper = useRef(null);
  const [question, setQuestion] = useState(getQuestion());
  const getNewQuestion = () => setQuestion(getQuestion());

  return (
    <div 
      className="quiz"
      ref={wrapper}
    >
      <div className="prompt">
        {question.kana}
      </div>
      <AnswerField 
        containerRef={wrapper}
        romaji={question.romaji} 
        onRightAnswer={getNewQuestion}
      />
    </div>
  )
}