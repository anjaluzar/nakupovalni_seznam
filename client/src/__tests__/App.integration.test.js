import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('App integration (client)', () => {
  afterEach(() => jest.clearAllMocks());

  // Test: ob mountu naj se izvede axios.get in prikaže naslov aplikacije
  test('fetches lists on mount and displays manager', async () => {
    const axios = require('axios');
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<App />);

    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(screen.getByText(/🛒 Nakupovalni seznami/i)).toBeInTheDocument();
  });

  // Test: simulacija ustvarjanja novega seznama (mockan POST) in preverjanje, da se prikaže v UI
  test('createList posts to server and updates UI', async () => {
    const user = userEvent;
    axios.get.mockResolvedValueOnce({ data: [] });
    const created = { _id: 'new', name: 'Test', items: [] };
    axios.post.mockResolvedValueOnce({ data: created });

    render(<App />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const input = screen.getByPlaceholderText(/Ime novega seznama/i);
    const createBtn = screen.getByRole('button', { name: /Ustvari/i });

    await user.type(input, 'Test');
    await user.click(createBtn);

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    // new list should appear
    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });
});
