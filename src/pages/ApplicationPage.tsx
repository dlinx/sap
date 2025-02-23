import React from 'react';
import { Box } from '@mui/material';
import { ApplicationForm } from '../components/ApplicationForm/ApplicationForm';

const ApplicationPage: React.FC = () => {
  return (
    <Box sx={{
      flexGrow: 1,
      bgcolor: 'background.default',
      py: { xs: 2, sm: 3 }
    }}>
      <ApplicationForm />
    </Box>
  );
};

export default ApplicationPage; 