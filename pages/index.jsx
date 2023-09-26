import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { romanizations } from '../data/kana';
import { hiragana, katakana, hiraganaDigraphs, katakanaDigraphs } from '../data/userdata';

function AnswerField({ romaji, onRightAnswer })
{
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [missed, setMissed] = useState(false);

  const pronunciation = new Audio('/audio/' + romaji.hepburn + '.wav');

  useEffect(() => 
  {    
    const focusInput = () => inputRef.current.focus();
    document.addEventListener('click', focusInput);
    focusInput();
    return () => document.removeEventListener('click', focusInput);
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
      placeholder={missed ? romaji.hepburn : ''}
      onChange={handleInput}
      autoComplete="off"
      autoFocus
    />
  )
}

function App()
{
  const [question, setQuestion] = useState(getQuestion());
  const getNewQuestion = () => setQuestion(getQuestion());

  return (
    <div className="wrapper">
      <div className="prompt">
        {question.kana}
      </div>
      <AnswerField 
        romaji={question.romaji} 
        onRightAnswer={getNewQuestion}
      />
    </div>
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

export default dynamic(() => Promise.resolve(App), { ssr: false })