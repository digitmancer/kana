import { useState } from 'react';
import { hiragana, katakana } from '../kana';

function App()
{
  const [kana, setKana] = useState(GetRandomKana());
  const newKana = () => setKana(GetRandomKana());

  return (
    <div
      className="wrapper" 
      onClick={newKana} 
      suppressHydrationWarning
    >
      {kana}
    </div>
  )
}

function GetRandomKana()
{
  const kana = {...hiragana, ...katakana};
  const keys = Object.keys(kana);
  return keys[Math.floor(Math.random() * keys.length)];
}

export default App;