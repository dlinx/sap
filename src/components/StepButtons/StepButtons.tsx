import React from 'react';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StepButtonsProps {
  currentStep: number;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveAsDraft: () => void;
  canProceed: boolean;
  className?: string;
}

const ButtonContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    '& .MuiButton-root': {
      width: '100%',
    },
  },
}));

export const StepButtons: React.FC<StepButtonsProps> = ({
  currentStep,
  isLastStep,
  onBack,
  onNext,
  onSaveAsDraft,
  canProceed,
  className = '',
}) => {
  return (
    <ButtonContainer
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="flex-end"
      className={className}
      sx={{ mt: 3 }}
    >
      {currentStep > 0 && (
        <Button
          variant="outlined"
          onClick={onBack}
          color="inherit"
        >
          Back
        </Button>
      )}
      <Button
        variant="outlined"
        onClick={onSaveAsDraft}
        color="primary"
      >
        Save as Draft
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        disabled={!canProceed}
        color="primary"
      >
        {isLastStep ? 'Submit' : 'Next'}
      </Button>
    </ButtonContainer>
  );
}; 