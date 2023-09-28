import { useContext } from 'react';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { ConfigContext } from './configProvider';

export default function Settings()
{
  const [config, setConfig] = useContext(ConfigContext);
  const handleVoiceChange = (event) => setConfig({...config, voice: event.target.value});
  const handleRomanizationChange = (event) => setConfig({...config, romanization: event.target.value});
  
  return (
    <div className="settings" >
      <FormControl variant="standard">
        <Select
          value={config.voice}
          label="Voice"
          onChange={handleVoiceChange}
        >
          <MenuItem value={'kaito'}>Kaito</MenuItem>
          <MenuItem value={'mei'}>Mei</MenuItem>
          <MenuItem value={'nobu'}>Nobu</MenuItem>
          <MenuItem value={'sakura'}>Sakura</MenuItem>
        </Select>
        <FormHelperText>Pronunciation voice</FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <Select
          value={config.romanization}
          label="Romanization"
          onChange={handleRomanizationChange}
        >
          <MenuItem value={'hepburn'}>Hepburn</MenuItem>
          <MenuItem value={'kunrei'}>Kunrei-shiki</MenuItem>
          <MenuItem value={'nihon'}>Nihon-shiki</MenuItem>
        </Select>
          <FormHelperText>Preferred romanization</FormHelperText>
      </FormControl>
    </div>
  );
}