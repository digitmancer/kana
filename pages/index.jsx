import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { hiragana, hiraganaDigraphs, katakana, katakanaDigraphs } from '../data/kana';

function AnswerField({ rightAnswer, onRightAnswer })
{
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [missed, setMissed] = useState(false);

  useEffect(() => 
  {    
    const focusInput = () => inputRef.current.focus();
    document.addEventListener('click', focusInput);
    focusInput();
    return () => document.removeEventListener('click', focusInput);
  }, []);

  const handleInput = (event) => 
  {
    const value = event.target.value.toLowerCase().trim();
    if (value === 'n' &&
        value === rightAnswer)
    {
        handleRightAnswer();
        return;
    }

    if (value.length === 3 ||
        ['a', 'e', 'i', 'o', 'u'].includes(value.charAt(value.length - 1)))
    {
      if (value === rightAnswer)
        handleRightAnswer();
      else
        handleWrongAnswer();
      return;
    }

    setInput(value);
  };

  const handleRightAnswer = () =>
  {
    setMissed(false);
    setInput('');
    onRightAnswer();
  };

  const handleWrongAnswer = () =>
  {
    setMissed(true);
    setInput('');
  };

  return (
    <input 
      className="answer"
      type="text"
      value={input}
      ref={inputRef}
      placeholder={missed ? rightAnswer : ''}
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
        {question.prompt}
      </div>
      <AnswerField 
        rightAnswer={question.answer} 
        onRightAnswer={getNewQuestion}
      />
    </div>
  )
}

function getQuestion()
{
  const questions = [...hiragana, ...katakana, ...hiraganaDigraphs, ...katakanaDigraphs];
  const question = questions[Math.floor(Math.random() * questions.length)];
  return { 
    prompt: question.kana, 
    answer: question.pronunciation 
  };
}

export default dynamic(() => Promise.resolve(App), { ssr: false })