import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { AcademicDetails } from '../../../hooks/useApplicationForm';

interface AcademicDetailsStepProps {
  data: AcademicDetails;
  errors: Record<string, string>;
  onChange: (data: Partial<AcademicDetails>) => void;
  onBlur: (field: string) => void;
}

export const AcademicDetailsStep: React.FC<AcademicDetailsStepProps> = ({
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
        Academic Information
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please provide your academic details below.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="High School Name"
            name="highSchoolName"
            value={data.highSchoolName}
            onChange={handleInputChange}
            onBlur={handleBlur('highSchoolName')}
            error={!!errors.highSchoolName}
            helperText={errors.highSchoolName}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="High School Grade/GPA"
            name="highSchoolGrade"
            value={data.highSchoolGrade}
            onChange={handleInputChange}
            onBlur={handleBlur('highSchoolGrade')}
            error={!!errors.highSchoolGrade}
            helperText={errors.highSchoolGrade}
            placeholder="e.g., 3.8/4.0"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Previous Degree"
            name="previousDegree"
            value={data.previousDegree}
            onChange={handleInputChange}
            onBlur={handleBlur('previousDegree')}
            placeholder="e.g., Associate's Degree in Science"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Previous Institution"
            name="previousInstitute"
            value={data.previousInstitute}
            onChange={handleInputChange}
            onBlur={handleBlur('previousInstitute')}
            placeholder="Name of previous college/university"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Previous Institution GPA"
            name="gpa"
            value={data.gpa}
            onChange={handleInputChange}
            onBlur={handleBlur('gpa')}
            placeholder="e.g., 3.5/4.0"
          />
        </Grid>
      </Grid>
    </Box>
  );
}; 