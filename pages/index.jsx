import dynamic from 'next/dynamic';
import KanaQuiz from '../src/components/kanaQuiz'
import KanaTable from '../src/components/kanaTable'

function App()
{
  return (
    <div>
      <KanaQuiz voice={'sakura'} />
      <KanaTable type={'hiragana'} voice={'sakura'} />
      <KanaTable type={'katakana'} voice={'sakura'} />
    </div>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })