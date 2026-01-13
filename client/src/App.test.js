import { render, screen, waitFor } from '@testing-library/react';
jest.mock('axios');
import axios from 'axios';
import App from './App';

// Test: ob zagonu aplikacije se požene axios.get in prikaže se naslov aplikacije
test('renders app header and fetches lists', async () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  render(<App />);
  await waitFor(() => expect(axios.get).toHaveBeenCalled());
  expect(screen.getByText(/🛒 Nakupovalni seznami/i)).toBeInTheDocument();
});
