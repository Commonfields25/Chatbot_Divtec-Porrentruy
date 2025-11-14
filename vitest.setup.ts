import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the SpeechSynthesis API
const mockSpeechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  getVoices: vi.fn(() => []),
  onvoiceschanged: null,
};

Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
  writable: true,
});

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
