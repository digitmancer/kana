import { useEffect, useState, useRef } from 'react';
import { hiragana, katakana } from '../data/kana';

function App()
{
  const inputRef = useRef(null);
  const focusInput = () => inputRef.current.focus();

  const [kana, setKana] = useState(getRandomKana());
  const getNewKana = () => setKana(getRandomKana());

  const [input, setInput] = useState('');
  const resetInput = () => setInput('');
  const checkInput = (value) => 
  {
    if (value === 'n' &&
        isCorrectAnswer(kana, value))
    {
        getNewKana();
        resetInput();
        return;
    }

    if (value.length === 3 ||
        ['a', 'e', 'i', 'o', 'u'].includes(value.charAt(value.length - 1)))
    {
      if (isCorrectAnswer(kana, value))
        getNewKana();
      resetInput();
      return;
    }

    setInput(value.toLowerCase().trim());
  };
  
  useEffect(() => 
  {    
    document.addEventListener('click', focusInput);
    return () => document.removeEventListener('click', focusInput);
  });

  return (
    <div className="wrapper">
      <div 
        className="prompt" 
        suppressHydrationWarning
      >
        {kana}
      </div>
      <input 
        className="answer"
        type="text"
        value={input}
        ref={inputRef}
        onChange={event => checkInput(event.target.value)}
        autoFocus
      />
    </div>
  )
}

function getRandomKana()
{
  const kana = {...hiragana, ...katakana};
  const keys = Object.keys(kana);
  return keys[Math.floor(Math.random() * keys.length)];
}

function isCorrectAnswer(prompt, answer)
{
  const kana = {...hiragana, ...katakana};
  const pronunciation = kana[prompt];
  return (answer === pronunciation);
}

export default App;