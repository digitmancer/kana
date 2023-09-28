import { createContext, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../src/components/header';
import KanaQuiz from '../src/components/kanaQuiz';
import KanaTables from '../src/components/kanaTables';
import Settings from '../src/components/settings';
import { ConfigProvider } from '../src/components/configProvider';

const AppContext = createContext({
});

function PracticePage()
{
  return (
    <KanaQuiz />
  )
}

function ReviewPage()
{
  return (
    <div>
      <KanaTables type={'hiragana'} />
      <KanaTables type={'katakana'} />
    </div>
  )
}

function SettingsPage()
{
  return (
    <Settings />
  )
}

function PageContent({ page })
{
  switch (page)
  {
    case 'Practice':
      return <PracticePage />
    case 'Review':
      return <ReviewPage />
    case 'Settings':
      return <SettingsPage />
    default:
      return <PracticePage />
  }
}

function App()
{
  const pages = [ 'Practice', 'Review', 'Settings' ];
  const [page, setPage] = useState('Practice');

  return (
    <ConfigProvider>
      <Header pages={pages} setPage={setPage} />
      <PageContent page={page} />
    </ConfigProvider>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })