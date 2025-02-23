import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Button,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Documents } from '../../../hooks/useApplicationForm';

interface DocumentUploadStepProps {
  data: Documents;
  errors: Record<string, string>;
  onChange: (data: Partial<Documents>) => void;
  onValidate: (field: string) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  data,
  errors,
  onChange,
  onValidate,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Documents) => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'transcripts' || field === 'recommendations') {
      onChange({ [field]: Array.from(files) });
    } else {
      onChange({ [field]: files[0] });
    }
    onValidate(field);
  };

  const getFileName = (file: File | undefined) => {
    return file ? file.name : 'No file chosen';
  };

  const getFileNames = (files: File[] | undefined) => {
    return files && files.length > 0
      ? `${files.length} file(s) selected`
      : 'No files chosen';
  };

  return (
    <Box>
      <Typography variant="h5" color="primary" gutterBottom>
        Document Upload
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please upload the required documents in PDF format.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              ID Proof (Required) *
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
              color={errors.idProof ? 'error' : 'primary'}
            >
              Upload ID Proof
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleFileChange(e, 'idProof')}
                accept=".pdf"
              />
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {getFileName(data.idProof)}
            </Typography>
            {errors.idProof && (
              <Typography color="error" variant="caption">
                {errors.idProof}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Academic Transcripts (Multiple files allowed)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
              color={errors.transcripts ? 'error' : 'primary'}
            >
              Upload Transcripts
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleFileChange(e, 'transcripts')}
                accept=".pdf"
                multiple
              />
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {getFileNames(data.transcripts)}
            </Typography>
            {errors.transcripts && (
              <Typography color="error" variant="caption">
                {errors.transcripts}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Letters of Recommendation (Optional)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
              color={errors.recommendations ? 'error' : 'primary'}
            >
              Upload Recommendations
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleFileChange(e, 'recommendations')}
                accept=".pdf"
                multiple
              />
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {getFileNames(data.recommendations)}
            </Typography>
            {errors.recommendations && (
              <Typography color="error" variant="caption">
                {errors.recommendations}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 4 }}>
        <AlertTitle>Important Notes:</AlertTitle>
        <List dense>
          <ListItem>
            <ListItemText primary="Maximum file size: 5MB per file" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Accepted format: PDF files only" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Ensure all documents are clear and legible" />
          </ListItem>
        </List>
      </Alert>
    </Box>
  );
};