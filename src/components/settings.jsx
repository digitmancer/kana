import { useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { ConfigContext } from './configProvider';

function ResetDataButton()
{
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const openConfirmationDialog = () => setDialogOpen(true);
  const closeConfirmationDialog = () => setDialogOpen(false);

  const resetUserData = () => 
  {
    localStorage.clear('userData');
    closeConfirmationDialog();
  }

  return (
    <>
      <Button 
        variant="outlined"
        color="error"
        onClick={openConfirmationDialog}
      >
        RESET LEARNING DATA
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={closeConfirmationDialog}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          Reset learning data?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            Are you sure you want to reset all learning data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} autoFocus>
            CANCEL
          </Button>
          <Button onClick={resetUserData} color="error">
            RESET
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

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
      <ResetDataButton />
    </div>
  );
}