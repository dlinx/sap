import { render, screen, fireEvent } from '../../test/test-utils';
import { SuccessModal } from './SuccessModal';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SuccessModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders nothing when closed', () => {
    render(<SuccessModal open={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Application Submitted Successfully!')).not.toBeInTheDocument();
  });

  it('renders success message when open', () => {
    render(<SuccessModal open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Application Submitted Successfully!')).toBeInTheDocument();
    expect(screen.getByText('Your application has been successfully submitted. We will review your application and get back to you soon.')).toBeInTheDocument();
  });

  it('renders return to home button', () => {
    render(<SuccessModal open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Return to Home')).toBeInTheDocument();
  });

  it('calls onClose when return to home button is clicked', () => {
    render(<SuccessModal open={true} onClose={mockOnClose} />);
    const button = screen.getByText('Return to Home');
    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays success icon', () => {
    render(<SuccessModal open={true} onClose={mockOnClose} />);
    expect(screen.getByTestId('CheckCircleOutlineIcon')).toBeInTheDocument();
  });
}); 