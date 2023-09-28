import { gojoun, dakuten, yoon } from '../kana';

function MoraData({ data, type, voice })
{
  const [label, mora] = data;

  if (mora === null)
    return <th />

  const pronunciation = new Audio(`/audio/${voice}/${label}.mp3`);
  const playPronunciation = () => pronunciation.play();

  return (
    <td onClick={playPronunciation}>{mora ? mora[type] : ''}</td>
  )
}

function MoraTable({ headers, data, type, voice })
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
              <MoraData key={index} data={data} type={type} voice={voice} />
            )}
            <th>&nbsp;&nbsp;&nbsp;</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function KanaTables({ type, voice })
{
  const kanaHeaders = ['a', 'i', 'u', 'e', 'o'];
  const yoonHeaders = ['a', 'u', 'o'];

  return (
    <div className='kanaTables'>
      <div className='label'>
        <h1>{type}</h1>
        <h3>{type === 'hiragana' ? 'ひらがな' : 'かたかな'}</h3>
      </div>
      <MoraTable 
        headers={kanaHeaders}
        data={gojoun}  
        type={type} 
        voice={voice} 
      />
      <MoraTable 
        headers={kanaHeaders}
        data={dakuten}
        type={type}
        voice={voice} 
      />
      <MoraTable 
        headers={yoonHeaders} 
        data={yoon}
        type={type} 
        voice={voice} 
      />
    </div>
  )
}