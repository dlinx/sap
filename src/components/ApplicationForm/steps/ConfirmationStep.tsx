import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import { ApplicationData } from '../../../hooks/useApplicationForm';

interface ConfirmationStepProps {
  formData: ApplicationData;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  formData,
}) => {
  const { basicDetails, academicDetails, documents } = formData;

  const renderDocumentStatus = (file: File | undefined) => {
    return file ? (
      <Chip label="Uploaded" color="success" size="small" />
    ) : (
      <Chip label="Not uploaded" color="error" size="small" />
    );
  };

  const renderMultipleDocumentStatus = (files: File[] | undefined) => {
    return files && files.length > 0 ? (
      <Chip label={`${files.length} file(s) uploaded`} color="success" size="small" />
    ) : (
      <Chip label="No files uploaded" color="warning" size="small" />
    );
  };

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" color="primary" gutterBottom>
        Application Summary
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please review your application details before submitting.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InfoItem
                  label="Full Name"
                  value={`${basicDetails.firstName} ${basicDetails.lastName}`}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoItem label="Email" value={basicDetails.email} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoItem label="Phone" value={basicDetails.phone} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoItem
                  label="Date of Birth"
                  value={basicDetails.dateOfBirth || 'Not provided'}
                />
              </Grid>
              <Grid item xs={12}>
                <InfoItem
                  label="Address"
                  value={basicDetails.address || 'Not provided'}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Academic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoItem
                  label="High School"
                  value={academicDetails.highSchoolName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoItem
                  label="High School Grade"
                  value={academicDetails.highSchoolGrade}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoItem
                  label="Previous Degree"
                  value={academicDetails.previousDegree ?? 'Not applicable'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoItem
                  label="Previous Institution"
                  value={academicDetails.previousInstitute ?? 'Not applicable'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoItem
                  label="Previous GPA"
                  value={academicDetails.gpa ?? 'Not applicable'}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Documents
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID Proof
                  </Typography>
                  {renderDocumentStatus(documents.idProof)}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Transcripts
                  </Typography>
                  {renderMultipleDocumentStatus(documents.transcripts)}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Recommendations
                  </Typography>
                  {renderMultipleDocumentStatus(documents.recommendations)}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Alert severity="warning">
        <Typography variant="body1">
          By clicking Submit, you confirm that all the information provided is accurate
          and complete to the best of your knowledge.
        </Typography>
      </Alert>
    </Box>
  );
}; 