import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItemForm from '../components/AddItemForm';

describe('AddItemForm', () => {
  // Test: preveri, da se ob vnosu z odvečnimi presledki pokliče onAdd z obrezanim imenom in da se input počisti
  test('calls onAdd with trimmed input and clears input', async () => {
    const onAdd = jest.fn();
    render(<AddItemForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/Dodaj izdelek/i);
    const button = screen.getByRole('button', { name: /Dodaj/i });

    await userEvent.type(input, '  mleko  ');
    await userEvent.click(button);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('mleko');
    expect(input).toHaveValue('');
  });

  // Test: če je vnos samo presledki, ne smejo klicati onAdd
  test('does not call onAdd when input is empty or whitespace', async () => {
    const onAdd = jest.fn();
    render(<AddItemForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/Dodaj izdelek/i);
    const button = screen.getByRole('button', { name: /Dodaj/i });

    await userEvent.type(input, '   ');
    await userEvent.click(button);

    expect(onAdd).not.toHaveBeenCalled();
  });
});
