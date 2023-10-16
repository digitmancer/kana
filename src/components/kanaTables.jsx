import { useContext } from 'react';
import { Button } from '@mui/material';
import { ConfigContext } from './configProvider';
import { gojoun, dakuten, yoon, romanizations } from '../kana';

function MoraData({ data, type })
{
  const [label, mora] = data;
  const [config] = useContext(ConfigContext);

  if (mora === null)
    return <th />

  const playPronunciation = () => 
  { 
    const pronunciation = new Audio(`/audio/${config.voice}/${label}.mp3`);
    pronunciation.play();
  };

  return (
    <td>
      <Button 
        variant="contained"
        onClick={playPronunciation}
      >
        {mora[type]}
        <br />
        {romanizations[mora[type]][config.romanization]}
      </Button>
    </td>
  )
}

function MoraTable({ headers, data, type, label })
{
  return (
    <table>
      <caption>{label}</caption>
      <thead>
        <tr>
          <th />
          {headers.map(header => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([label, mora]) => (
          <tr key={label}>
            <th>{label}</th>
            {Object.entries(mora).map((data, index) =>
              <MoraData key={index} data={data} type={type} />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function KanaTables({ type })
{
  const kanaHeaders = ['a', 'i', 'u', 'e', 'o'];
  const yoonHeaders = ['a', 'u', 'o'];

  return (
    <div className='kanaTables'>
      <div className='label'>
        <h1>{type === 'hiragana' ? 'Hiragana' : 'Katakana'}</h1>
        <h3>{type === 'hiragana' ? 'ひらがな' : 'カタカナ'}</h3>
      </div>
      <div className='tables'>
        <MoraTable 
          headers={kanaHeaders}
          label={'Gojūon'}
          data={gojoun}  
          type={type} 
        />
        <MoraTable 
          headers={kanaHeaders}
          label={'Dakuten / Handakuten'}
          data={dakuten}
          type={type}
        />
        <MoraTable 
          headers={yoonHeaders} 
          label={'Yōon'}
          data={yoon}
          type={type} 
        />
      </div>
    </div>
  )
}