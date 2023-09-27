import dynamic from 'next/dynamic';
import KanaQuiz from '../src/components/kanaQuiz'
import KanaTable from '../src/components/kanaTable'

function App()
{
  return (
    <div>
      <KanaQuiz />
      <KanaTable type={'hiragana'}/>
      <KanaTable type={'katakana'}/>
    </div>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })