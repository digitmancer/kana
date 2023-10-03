import { createContext, useState } from 'react';

const defaultConfig = {
  romanization: 'hepburn',
  voice: 'sakura'
};

const ConfigContext = createContext();

function ConfigProvider({ children })
{
  const [config, setConfig] = useState(loadConfig());

  const updateConfiguration = (value) => 
  {
    if (value === null)
      value = defaultConfig;

    setConfig(value);
    storeConfig(value);
  };

  return (
    <ConfigContext.Provider value={[config, updateConfiguration]}>
      {children}
    </ConfigContext.Provider>
  )
}

function loadConfig()
{
  const config = localStorage.getItem('userConfig');
  if (config)
    return JSON.parse(config);

  storeConfig(defaultConfig);
  return defaultConfig;
}

function storeConfig(value)
{
  localStorage.setItem('userConfig', JSON.stringify(value));
}

export { ConfigContext, ConfigProvider };