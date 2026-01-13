import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoppingList from '../components/ShoppingList';

describe('ShoppingList', () => {
  // Test: če seznam nima elementov, se prikaže sporočilo o praznem seznamu
  test('shows empty message when no items', () => {
    render(<ShoppingList items={[]} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Seznam je prazen/i)).toBeInTheDocument();
  });

  // Test: preveri prikaz elementov ter dogodka toggle in delete (klik vrstice in klik gumba)
  test('renders items and handles toggle and delete correctly', async () => {
    const items = [
      { _id: '1', name: 'mleko', bought: false },
      { _id: '2', name: 'kruh', bought: true }
    ];
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(<ShoppingList items={items} onToggle={onToggle} onDelete={onDelete} />);

    // Click first list item to toggle
    const first = screen.getByText(/mleko/i);
    await userEvent.click(first);
    expect(onToggle).toHaveBeenCalledWith('1');

    // Click delete button of second item
    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith('2');
  });
});
