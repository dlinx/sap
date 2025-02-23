import React from 'react';
import { render, screen, fireEvent } from '../../test/test-utils';
import { ChatSupport } from './ChatSupport';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock ChatWindow component
vi.mock('./ChatWindow', () => ({
  ChatWindow: vi.fn(({ onMinimize, onClose, onMaximize, isMinimized }) => (
    <div data-testid="chat-window" data-minimized={isMinimized}>
      <button onClick={onMinimize}>Minimize</button>
      <button onClick={onClose}>Close</button>
      <button onClick={onMaximize}>Maximize</button>
    </div>
  ))
}));

describe('ChatSupport', () => {
  it('renders chat button when closed', () => {
    render(<ChatSupport />);
    expect(screen.getByLabelText('chat support')).toBeInTheDocument();
    expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
  });

  it('opens chat window when button is clicked', () => {
    render(<ChatSupport />);
    const chatButton = screen.getByLabelText('chat support');
    fireEvent.click(chatButton);
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    expect(screen.queryByLabelText('chat support')).not.toBeInTheDocument();
  });

  describe('Chat Window interactions', () => {
    beforeEach(() => {
      render(<ChatSupport />);
      const chatButton = screen.getByLabelText('chat support');
      fireEvent.click(chatButton);
    });

    it('minimizes chat window', () => {
      const minimizeButton = screen.getByText('Minimize');
      fireEvent.click(minimizeButton);
      expect(screen.getByTestId('chat-window')).toHaveAttribute('data-minimized', 'true');
    });

    it('maximizes minimized chat window', () => {
      // First minimize
      fireEvent.click(screen.getByText('Minimize'));
      // Then maximize
      fireEvent.click(screen.getByText('Maximize'));
      expect(screen.getByTestId('chat-window')).toHaveAttribute('data-minimized', 'false');
    });

    it('closes chat window and shows chat button', () => {
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
      expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
      expect(screen.getByLabelText('chat support')).toBeInTheDocument();
    });

    it('handles minimize and maximize through maximize handler', () => {
      // First minimize
      fireEvent.click(screen.getByText('Minimize'));
      // Verify window is minimized
      expect(screen.getByTestId('chat-window')).toHaveAttribute('data-minimized', 'true');
      // Then maximize
      fireEvent.click(screen.getByText('Maximize'));
      // Verify window is maximized
      expect(screen.getByTestId('chat-window')).toHaveAttribute('data-minimized', 'false');
    });
  });
}); 