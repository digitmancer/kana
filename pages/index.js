import { useEffect, useState, useRef } from 'react';
import { hiragana, katakana } from '../kana';

function App()
{
  const inputRef = useRef(null);
  const focusInput = () => inputRef.current.focus();

  const [kana, setKana] = useState(getRandomKana());
  const getNewKana = () => setKana(getRandomKana());

  const [answer, setAnswer] = useState('');
  const resetAnswer = () => setAnswer('');
  const checkInput = (value) => 
  {
    if (value === 'n')
    {
      if(checkAnswer(kana, value))
      {
        getNewKana();
        resetAnswer();
        return;
      }
    }

    if (['a', 'e', 'i', 'o', 'u'].includes(value.charAt(value.length - 1)) ||
        value.length === 3)
    {
      if (checkAnswer(kana, value))
        getNewKana();
      resetAnswer();
      return;
    }

    setAnswer(value);
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
        value={answer}
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

function checkAnswer(prompt, answer)
{
  const kana = {...hiragana, ...katakana};
  const answers = kana[prompt];
  return answers.includes(answer);
}

export default App;