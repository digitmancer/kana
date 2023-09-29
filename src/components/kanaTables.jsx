import { useContext } from 'react';
import { ConfigContext } from './configProvider';
import { gojoun, dakuten, yoon } from '../kana';

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
    <td onClick={playPronunciation}>{mora ? mora[type] : ''}</td>
  )
}

function MoraTable({ headers, data, type })
{
  return (
    <table>
      <thead>
        <tr>
          <th />
          {headers.map(header => (
            <th>{header}</th>
          ))}
          <th>&nbsp;&nbsp;&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([label, mora]) => (
          <tr key={label}>
            <th>{label}</th>
            {Object.entries(mora).map((data, index) =>
              <MoraData key={index} data={data} type={type} />
            )}
            <th>&nbsp;&nbsp;&nbsp;</th>
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
        <h1>{type}</h1>
        <h3>{type === 'hiragana' ? 'ひらがな' : 'カタカナ'}</h3>
      </div>
      <MoraTable 
        headers={kanaHeaders}
        data={gojoun}  
        type={type} 
      />
      <MoraTable 
        headers={kanaHeaders}
        data={dakuten}
        type={type}
      />
      <MoraTable 
        headers={yoonHeaders} 
        data={yoon}
        type={type} 
      />
    </div>
  )
}