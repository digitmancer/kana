import { createContext, useState } from 'react';

const ConfigContext = createContext();

function ConfigProvider({ children })
{
  const [config, setConfig] = useState({
    romanization: 'hepburn',
    voice: 'sakura'
  })

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigContext, ConfigProvider };