import { useEffect, useState } from 'react';
import { hiragana, katakana } from '../kana';

function App()
{
  const [kana, setKana] = useState(getRandomKana());
  const newKana = () => setKana(getRandomKana());

  const [answer, setAnswer] = useState('');
  const resetAnswer = () => setAnswer('');

  useEffect(() => 
  {
    const handleKeyPress = (event) =>
    {
      const pressed = event.key.toLowerCase();

      if (pressed === 'backspace')
      {
        if (answer.length === 0)
          return;

        setAnswer(answer.substring(0, answer.length - 1));
        return;
      }

      if (['a', 'e', 'i', 'o', 'u', 'enter'].includes(pressed) ||
          answer.length === 2)
      {
        const finalAnswer = answer + pressed;
        if (checkAnswer(kana, finalAnswer))
          newKana();
        resetAnswer();
        return;
      }

      if (pressed === 'n' && 
          answer.length === 0)
      {
        if(checkAnswer(kana, pressed))
        {
          newKana();
          resetAnswer();
        }
        else
          setAnswer(pressed);
        return;
      }

      if (pressed.length != 1)
        return;

      setAnswer(answer + pressed);
    };
    
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <div className="wrapper">
      <div
        className="prompt"
        suppressHydrationWarning
      >
        {kana}
      </div>
      <div
        className="answer"
        suppressHydrationWarning
      >
        {answer}
      </div>
    </div>
  )
}

function getRandomKana()
{
  const kana = {...hiragana, ...katakana};
  const keys = Object.keys(kana);
  return keys[Math.floor(Math.random() * keys.length)];
}

function checkAnswer(char, guess)
{
  const kana = {...hiragana, ...katakana};
  return kana[char].includes(guess);
}

export default App;