import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText('Dünya Saatleri')).toBeInTheDocument();
  });

  it('renders timezone selector', () => {
    render(<App />);
    expect(screen.getByText('Zaman Dilimi Ekle')).toBeInTheDocument();
  });
});