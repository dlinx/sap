import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { BasicDetails } from '../../../hooks/useApplicationForm';

interface BasicDetailsStepProps {
  data: BasicDetails;
  errors: Record<string, string>;
  onChange: (data: Partial<BasicDetails>) => void;
  onBlur: (field: string) => void;
}

export const BasicDetailsStep: React.FC<BasicDetailsStepProps> = ({
  data,
  errors,
  onChange,
  onBlur,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleBlur = (field: string) => () => {
    onBlur(field);
  };

  return (
    <Box>
      <Typography variant="h5" color="primary" gutterBottom>
        Basic Information
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please provide your personal details below.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={data.firstName}
            onChange={handleInputChange}
            onBlur={handleBlur('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={handleInputChange}
            onBlur={handleBlur('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={data.email}
            onChange={handleInputChange}
            onBlur={handleBlur('email')}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={handleInputChange}
            onBlur={handleBlur('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={handleInputChange}
            onBlur={handleBlur('dateOfBirth')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={data.address}
            onChange={handleInputChange}
            onBlur={handleBlur('address')}
            error={!!errors.address}
            helperText={errors.address}
            multiline
            rows={3}
            placeholder="Enter your full address"
          />
        </Grid>
      </Grid>
    </Box>
  );
}; 