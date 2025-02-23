import React, { useState } from 'react';
import { Container, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { StepButtons } from '../StepButtons/StepButtons';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { 
  useApplicationForm, 
  ApplicationData, 
  BasicDetails, 
  AcademicDetails, 
  Documents 
} from '../../hooks/useApplicationForm';
import { WelcomeStep } from './steps/WelcomeStep';
import { BasicDetailsStep } from './steps/BasicDetailsStep';
import { AcademicDetailsStep } from './steps/AcademicDetailsStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { ConfirmationStep } from './steps/ConfirmationStep';

export const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    updateFormData,
    validateField,
    validateForm,
    saveAsDraft,
    nextStep,
    previousStep,
  } = useApplicationForm();

  const [showValidationError, setShowValidationError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      // Clear the draft application
      localStorage.removeItem('applicationFormDraft');
      // Show success modal
      setShowSuccessModal(true);
    } else {
      setShowValidationError(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleNext = () => {
    const moved = nextStep();
    if (!moved) {
      setShowValidationError(true);
    } else {
      setShowValidationError(false);
    }
  };

  const handleFieldValidation = (section: keyof ApplicationData) => (field: string) => {
    validateField(section, field);
    setShowValidationError(false);
  };

  const renderStep = () => {
    switch (formData.currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return (
          <BasicDetailsStep
            data={formData.basicDetails}
            errors={errors}
            onChange={(data: Partial<BasicDetails>) => updateFormData('basicDetails', data)}
            onBlur={handleFieldValidation('basicDetails')}
          />
        );
      case 2:
        return (
          <AcademicDetailsStep
            data={formData.academicDetails}
            errors={errors}
            onChange={(data: Partial<AcademicDetails>) => updateFormData('academicDetails', data)}
            onBlur={handleFieldValidation('academicDetails')}
          />
        );
      case 3:
        return (
          <DocumentUploadStep
            data={formData.documents}
            errors={errors}
            onChange={(data: Partial<Documents>) => updateFormData('documents', data)}
            onValidate={handleFieldValidation('documents')}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <ProgressBar
          currentStep={formData.currentStep}
        />
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.default' }}>
          {renderStep()}
          {showValidationError && Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the validation errors before proceeding.
            </Alert>
          )}
        </Paper>
        <StepButtons
          currentStep={formData.currentStep}
          isLastStep={formData.currentStep === 4}
          onBack={previousStep}
          onNext={formData.currentStep === 4 ? handleSubmit : handleNext}
          onSaveAsDraft={saveAsDraft}
          canProceed={true}
        />
      </Paper>
      <SuccessModal
        open={showSuccessModal}
        onClose={handleSuccessModalClose}
      />
    </Container>
  );
}; 