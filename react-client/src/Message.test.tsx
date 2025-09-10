import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Message } from './Message';

describe('Message component', () => {
  it('renders the message', () => {
    render(<Message />);
    expect(screen.getByText(/Hello, user!/i)).toBeInTheDocument();
    expect(screen.getByText(/Button clicked: 0 times/i)).toBeInTheDocument();
  });

  it('increments count when button is clicked', () => {
    render(<Message />);
    const button = screen.getByText(/Click me/i);

    fireEvent.click(button);
    expect(screen.getByText(/Button clicked: 1 times/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText(/Button clicked: 2 times/i)).toBeInTheDocument();
  });
});