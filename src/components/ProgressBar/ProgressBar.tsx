import React from 'react';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Box, 
  useTheme, 
  useMediaQuery,
  MobileStepper,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface ProgressBarProps {
  currentStep: number;
  className?: string;
}

const steps = [
  'Welcome',
  'Basic Details',
  'Academic Details',
  'Documents',
  'Review'
];

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepLabel-root .Mui-completed': {
    color: theme.palette.primary.main,
  },
  '& .MuiStepLabel-root .Mui-active': {
    color: theme.palette.primary.main,
  },
}));

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  '& .MuiLinearProgress-root': {
    width: '100%',
    height: '6px',
    borderRadius: theme.shape.borderRadius,
  },
}));

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  className = '',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
      <Box className={`w-full mb-16 ${className}`} data-testid="mobile-stepper-container">
        <Paper elevation={0} className="p-8 bg-transparent">
          <StyledMobileStepper
            variant="progress"
            steps={steps.length}
            position="static"
            activeStep={currentStep}
            backButton={null}
            nextButton={null}
            className="bg-transparent flex-col gap-6 p-0"
            LinearProgressProps={{
              variant: "determinate",
              value: progress
            }}
          />
          <div className="text-center font-medium text-sm mt-4 text-gray-900 dark:text-gray-100">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </div>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className={`w-full mb-16 ${className}`} data-testid="stepper-container">
      <StyledStepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StyledStepper>
    </Box>
  );
}; 