import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DivtecChatbot from '@/pages/index';

describe('DivtecChatbot', () => {
  it('renders the initial welcome message', () => {
    render(<DivtecChatbot />);
    const welcomeMessage = screen.getByText(/Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
