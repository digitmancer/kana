import dynamic from 'next/dynamic';
import KanaQuiz from '../src/components/kanaQuiz'
import KanaTables from '../src/components/kanaTables'

function App()
{
  return (
    <div>
      <KanaQuiz voice={'sakura'} />
      <KanaTables type={'hiragana'} voice={'sakura'} />
      <KanaTables type={'katakana'} voice={'sakura'} />
    </div>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })