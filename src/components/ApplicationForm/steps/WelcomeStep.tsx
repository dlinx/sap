import React from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
} from '@mui/material';

export const WelcomeStep: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to the College Application Process
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for choosing to apply to our college. This application process consists of four main steps:
      </Typography>

      <List sx={{ mb: 3 }}>
        <ListItem>
          <ListItemText primary="1. Basic Information - Your personal details and contact information" />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Academic Details - Your educational background and achievements" />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Document Upload - Required documents and certificates" />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Review and Submit - Final review of your application" />
        </ListItem>
      </List>

      <Typography variant="body1" paragraph>
        You can save your application as a draft at any time and return to complete it later.
        All your information will be securely stored.
      </Typography>

      <Paper sx={{ p: 3, bgcolor: 'primary.light', color: 'primary.contrastText', mt: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Before you begin:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Have your academic transcripts ready" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Prepare digital copies of your ID and photo" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Set aside approximately 15-20 minutes to complete the application" />
          </ListItem>
        </List>
      </Paper>

      <Alert severity="info" sx={{ mt: 2 }}>
        Click 'Next' to begin your application process.
      </Alert>
    </Box>
  );
}; 