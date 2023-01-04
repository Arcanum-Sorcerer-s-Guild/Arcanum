import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Project 2" heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/project 2/i);
  expect(linkElement).toBeInTheDocument();
});
