import { useState, useCallback } from 'react';

export interface BasicDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

export interface AcademicDetails {
  highSchoolName: string;
  highSchoolGrade: string;
  previousDegree?: string;
  previousInstitute?: string;
  gpa?: string;
}

export interface Documents {
  transcripts?: File[];
  idProof?: File;
  recommendations?: File[];
}

export interface ApplicationData {
  basicDetails: BasicDetails;
  academicDetails: AcademicDetails;
  documents: Documents;
  currentStep: number;
  isComplete: boolean;
  validatedFields: Set<string>;
}

export interface SerializedApplicationData extends Omit<ApplicationData, 'documents' | 'validatedFields'> {
  documents: {
    transcripts: never[];
    idProof: null;
    recommendations: never[];
  };
}

const INITIAL_STATE: ApplicationData = {
  basicDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
  },
  academicDetails: {
    highSchoolName: '',
    highSchoolGrade: '',
    previousDegree: '',
    previousInstitute: '',
    gpa: '',
  },
  documents: {
    transcripts: [],
    idProof: undefined,
    recommendations: [],
  },
  currentStep: 0,
  isComplete: false,
  validatedFields: new Set(),
};

const isValidPhoneNumber = (phone: string): boolean => {
  // Basic phone validation: allows formats like (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone.trim());
};

const validateBasicDetails = (data: BasicDetails, validatedFields: Set<string>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (validatedFields.has('firstName')) {
    if (!data.firstName) errors.firstName = 'First name is required';
    else if (data.firstName.length > 50) errors.firstName = 'First name is too long';
  }

  if (validatedFields.has('lastName')) {
    if (!data.lastName) errors.lastName = 'Last name is required';
    else if (data.lastName.length > 50) errors.lastName = 'Last name is too long';
  }

  if (validatedFields.has('email')) {
    if (!data.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
  }

  if (validatedFields.has('phone')) {
    if (!data.phone) errors.phone = 'Phone number is required';
    else if (!isValidPhoneNumber(data.phone)) {
      errors.phone = 'Invalid phone number format';
    }
  }

  if (validatedFields.has('address') && data.address && data.address.length > 200) {
    errors.address = 'Address is too long';
  }

  return errors;
};

const validateAcademicDetails = (data: AcademicDetails, validatedFields: Set<string>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (validatedFields.has('highSchoolName')) {
    if (!data.highSchoolName) errors.highSchoolName = 'High school name is required';
    else if (data.highSchoolName.length > 100) errors.highSchoolName = 'High school name is too long';
  }

  if (validatedFields.has('highSchoolGrade')) {
    if (!data.highSchoolGrade) errors.highSchoolGrade = 'High school grade is required';
    else if (data.highSchoolGrade.length > 10) errors.highSchoolGrade = 'Invalid grade format';
  }

  return errors;
};

const validateDocuments = (data: Documents, validatedFields: Set<string>): Record<string, string> => {
  const errors: Record<string, string> = {};
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  if (validatedFields.has('idProof')) {
    if (!data.idProof) {
      errors.idProof = 'ID proof is required';
    } else if (data.idProof.size > MAX_FILE_SIZE) {
      errors.idProof = 'ID proof file size should not exceed 5MB';
    }
  }

  if (validatedFields.has('transcripts') && data.transcripts?.some(file => file.size > MAX_FILE_SIZE)) {
    errors.transcripts = 'Some transcript files exceed 5MB limit';
  }

  if (validatedFields.has('recommendations') && data.recommendations?.some(file => file.size > MAX_FILE_SIZE)) {
    errors.recommendations = 'Some recommendation files exceed 5MB limit';
  }

  return errors;
};

// Add this new function to get all fields for a step
const getFieldsForStep = (step: number): string[] => {
  switch (step) {
    case 1:
      return ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address'];
    case 2:
      return ['highSchoolName', 'highSchoolGrade', 'previousDegree', 'previousInstitute', 'gpa'];
    case 3:
      return ['idProof', 'photo', 'transcripts', 'recommendations'];
    default:
      return [];
  }
};

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationData>(() => {
    try {
      const savedData = localStorage.getItem('applicationFormDraft');
      if (!savedData) return INITIAL_STATE;

      const parsedData = JSON.parse(savedData) as SerializedApplicationData;
      return {
        ...parsedData,
        documents: {
          transcripts: [],
          idProof: undefined,
          recommendations: [],
        },
        validatedFields: new Set(),
      };
    } catch {
      return INITIAL_STATE;
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCurrentStep = useCallback(() => {
    let newErrors: Record<string, string> = {};
    const fieldsToValidate = getFieldsForStep(formData.currentStep);
    
    if (formData.currentStep === 1) {
      newErrors = validateBasicDetails(formData.basicDetails, new Set(fieldsToValidate));
    } else if (formData.currentStep === 2) {
      newErrors = validateAcademicDetails(formData.academicDetails, new Set(fieldsToValidate));
    } else if (formData.currentStep === 3) {
      newErrors = validateDocuments(formData.documents, new Set(fieldsToValidate));
    }

    return newErrors;
  }, [formData.currentStep, formData.basicDetails, formData.academicDetails, formData.documents]);

  const validateForm = useCallback(() => {
    // Get all fields for current step and add them to validatedFields
    const fieldsToValidate = getFieldsForStep(formData.currentStep);
    setFormData(prev => ({
      ...prev,
      validatedFields: new Set([...prev.validatedFields, ...fieldsToValidate])
    }));
    
    const newErrors = validateCurrentStep();
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateCurrentStep]);

  const validateField = (section: keyof ApplicationData, field: string) => {
    // Add the field to validated fields
    setFormData(prev => ({
      ...prev,
      validatedFields: new Set([...prev.validatedFields, field])
    }));

    // First validate the specific field
    let fieldErrors: Record<string, string> = {};
    switch (section) {
      case 'basicDetails':
        fieldErrors = validateBasicDetails(formData.basicDetails, new Set([field]));
        break;
      case 'academicDetails':
        fieldErrors = validateAcademicDetails(formData.academicDetails, new Set([field]));
        break;
      case 'documents':
        fieldErrors = validateDocuments(formData.documents, new Set([field]));
        break;
    }

    // Then validate all previously validated fields in the current step
    const currentStepErrors = validateCurrentStep();
    const validatedFieldsInStep = new Set(
      [...formData.validatedFields].filter(f => getFieldsForStep(formData.currentStep).includes(f))
    );

    const filteredStepErrors = Object.entries(currentStepErrors)
      .filter(([key]) => validatedFieldsInStep.has(key))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    // Combine field-specific errors with step errors
    setErrors({ ...filteredStepErrors, ...fieldErrors });
  };

  const updateFormData = <K extends keyof ApplicationData>(
    section: K,
    data: Partial<ApplicationData[K]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section] as object, ...data as object } as ApplicationData[K],
    }));
  };

  const saveAsDraft = () => {
    const dataToSave: SerializedApplicationData = {
      ...formData,
      documents: {
        transcripts: [],
        idProof: null,
        recommendations: [],
      },
    };
    localStorage.setItem('applicationFormDraft', JSON.stringify(dataToSave));
  };

  const nextStep = () => {
    // Validate all fields in current step before proceeding
    const allFieldsValid = validateForm();
    if (allFieldsValid && formData.currentStep < 4) {
      setFormData(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      return true;
    }
    return false;
  };

  const previousStep = () => {
    if (formData.currentStep > 0) {
      setFormData(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const canSubmit = Object.keys(errors).length === 0 && formData.currentStep === 4;

  return {
    formData,
    errors,
    updateFormData,
    validateField,
    validateForm,
    saveAsDraft,
    nextStep,
    previousStep,
    canSubmit,
  };
}; 