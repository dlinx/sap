import React from 'react';
import { render, screen, fireEvent } from '../../test/test-utils';
import { AppBar } from './AppBar';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AppBar', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  it('renders the college portal link', () => {
    render(<AppBar onToggleTheme={mockToggleTheme} />);
    expect(screen.getByText('College Portal')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    render(<AppBar onToggleTheme={mockToggleTheme} />);
    expect(screen.getByLabelText('toggle theme')).toBeInTheDocument();
  });

  it('calls onToggleTheme when theme button is clicked', () => {
    render(<AppBar onToggleTheme={mockToggleTheme} />);
    const themeButton = screen.getByLabelText('toggle theme');
    fireEvent.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('renders the correct theme icon based on current theme', () => {
    render(<AppBar onToggleTheme={mockToggleTheme} />);
    // Since we're using light theme in test-utils, we should see the dark mode icon (Brightness4)
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });

  it('has a working navigation link to home', () => {
    render(<AppBar onToggleTheme={mockToggleTheme} />);
    const homeLink = screen.getByText('College Portal');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
}); 