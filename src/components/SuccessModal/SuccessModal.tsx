import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" component="div">
          Application Submitted Successfully!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography align="center" sx={{ mb: 2 }}>
          Your application has been successfully submitted. We will review your application and get back to you soon.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="contained"
          onClick={onClose}
          color="primary"
          size="large"
        >
          Return to Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 