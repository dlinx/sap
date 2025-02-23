import React from 'react';
import { render, screen } from '../../test/test-utils';
import { ProgressBar } from './ProgressBar';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useMediaQuery } from '@mui/material';

// Mock useMediaQuery hook
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn()
  };
});

describe('ProgressBar', () => {
  describe('Desktop view', () => {
    beforeEach(() => {
      (useMediaQuery as Mock).mockReturnValue(false); // Desktop view
    });

    it('renders all steps', () => {
      render(<ProgressBar currentStep={0} />);
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByText('Basic Details')).toBeInTheDocument();
      expect(screen.getByText('Academic Details')).toBeInTheDocument();
      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Review')).toBeInTheDocument();
    });


    it('applies custom className', () => {
      render(<ProgressBar currentStep={0} className="custom-class" />);
      const container = screen.getByTestId('stepper-container');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Mobile view', () => {
    beforeEach(() => {
      (useMediaQuery as Mock).mockReturnValue(true); // Mobile view
    });

    it('renders mobile progress indicator', () => {
      render(<ProgressBar currentStep={2} />);
      expect(screen.getByText('Step 3 of 5: Academic Details')).toBeInTheDocument();
    });

    it('shows correct progress percentage', () => {
      render(<ProgressBar currentStep={2} />);
      const progressBar = screen.getByRole('progressbar');
      // For step 2 (third step) out of 5 steps, progress should be 50%
      expect(progressBar).toHaveStyle({ width: '50%' });
    });

    it('applies custom className in mobile view', () => {
      render(<ProgressBar currentStep={0} className="custom-class" />);
      const container = screen.getByTestId('mobile-stepper-container');
      expect(container).toHaveClass('custom-class');
    });
  });
}); 