import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const hasDraft = localStorage.getItem('applicationFormDraft') !== null;

  const handleStartNew = () => {
    localStorage.removeItem('applicationFormDraft');
    navigate('/application');
  };

  const handleContinueDraft = () => {
    navigate('/application');
  };

  return (
    <Box sx={{
      flexGrow: 1,
      bgcolor: 'background.default',
      py: { xs: 4, sm: 6 }
    }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" align="center">
            Welcome to College Application Portal
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 4 }} align="center">
            Your journey to academic excellence starts here
          </Typography>

          <Typography variant="body1" paragraph>
            We're excited to help you take the next step in your educational journey. Our streamlined application process makes it easy to apply to your dream college program.
          </Typography>

          <Typography variant="body1" paragraph>
            The application process is simple and straightforward. You can complete it in one go, or save it as a draft and return later to finish it.
          </Typography>

          <Stack spacing={2} sx={{ mt: 6 }}>
            {hasDraft ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleContinueDraft}
                >
                  Continue Draft Application
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleStartNew}
                >
                  Start New Application
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleStartNew}
              >
                Start New Application
              </Button>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage; 