import { gojoun, dakuten, yoon } from '../kana';

function KanaData({ data, type, voice })
{
  const [label, kana] = data;
  const pronunciation = kana
                      ? new Audio(`/audio/${voice}/${label}.mp3`)
                      : null;
  const playPronunciation = () => 
  {
    if (pronunciation)
      pronunciation.play();
  };

  return (
    <td onClick={playPronunciation}>{kana ? kana[type] : ''}</td>
  )
}

export default function KanaTable({ type, voice })
{
  return (
    <div className='kanaTable'>
      <div className='tableName'>
        <h1>{type}</h1>
        <h3>{type === 'hiragana' ? 'ひらがな' : 'かたかな'}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>a</th>
            <th>i</th>
            <th>u</th>
            <th>e</th>
            <th>o</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries({...gojoun}).map(([label, kana]) => (
            <tr key={label}>
              <th>{label}</th>
              {Object.entries(kana).map((data, index) =>
                <KanaData key={index} data={data} type={type} voice={voice} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>a</th>
            <th>i</th>
            <th>u</th>
            <th>e</th>
            <th>o</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries({...dakuten}).map(([label, kana]) => (
            <tr key={label}>
              <th>{label}</th>
              {Object.entries(kana).map((data, index) =>
                <KanaData key={index} data={data} type={type} voice={voice} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>a</th>
            <th>u</th>
            <th>o</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries({...yoon}).map(([label, kana]) => (
            <tr key={label}>
              <th>{label}</th>
              {Object.entries(kana).map((data, index) =>
                <KanaData key={index} data={data} type={type} voice={voice} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}