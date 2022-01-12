import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FunctionComponent } from 'react';

interface Props{
  defaultOpen ?: boolean,
  onClickRestart ?: () => void,
  onClickResetPlayers ?: () => void
}

const WinnerDialog : FunctionComponent<Props> = ({defaultOpen = false , onClickRestart = () => {},
 onClickResetPlayers = () => {} , children}) =>{
  const [open, setOpen] = React.useState(false);

  const handleClickRestart = () => {
    onClickRestart();
  };

  const handleClickResetPlayers = () => {
    onClickResetPlayers();
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Button variant="outlined" onClick={handleClickRestart}>
        Restart
      </Button>
      <Button variant="outlined" onClick={handleClickResetPlayers}>
        Reset Players
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" autoFocus onClick={handleClickRestart}>
          Restart
        </Button>
        <Button variant="outlined" onClick={handleClickResetPlayers}>
          Reset Players
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}  
export default WinnerDialog;
