import { gojoun, dakuten, yoon, romanizations } from '../kana';

export default function KanaTable({ type })
{
  return (
    <div className='kanaTable'>
      <h1>{type}</h1>
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
              {Object.values(kana).map((element, index) =>                  
                <td key={index}>{element ? element[type] : ''}</td>
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
              {Object.values(kana).map((element, index) =>                  
                <td key={index}>{element ? element[type] : ''}</td>
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
              {Object.values(kana).map((element, index) =>                  
                <td key={index}>{element ? element[type] : ''}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}