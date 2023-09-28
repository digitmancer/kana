import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../src/components/header'
import KanaQuiz from '../src/components/kanaQuiz'
import KanaTables from '../src/components/kanaTables'

function StudyPage()
{
  return (
    <div>
      <KanaTables type={'hiragana'} voice={'sakura'} />
      <KanaTables type={'katakana'} voice={'sakura'} />
    </div>
  )
}

function QuizPage()
{
  return (
    <div>
      <KanaQuiz voice={'sakura'} />
    </div>
  )
}

function PageContent({ page })
{
  if (page == 'Practice')
    return <QuizPage />

  return <StudyPage />
}

function App()
{
  const [page, setPage] = useState('Practice');
  const pages = [ 'Practice', 'Review' ];

  return (
    <>
      <Header pages={pages} setPage={setPage} />
      <PageContent page={page} />
    </>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })