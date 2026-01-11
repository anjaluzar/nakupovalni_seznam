import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoppingListsManager from '../components/ShoppingListsManager';

describe('ShoppingListsManager', () => {
  // Test: prikaže obvestilo, če ni še nobenega seznama
  test('shows empty message when no lists', () => {
    render(<ShoppingListsManager lists={[]} onCreate={() => {}} onDelete={() => {}} onRename={() => {}} onOpen={() => {}} />);
    expect(screen.getByText(/Nimaš še nobenega seznama/i)).toBeInTheDocument();
  });

  // Test: obrazec za ustvarjanje mora obrezati ime, poklicati onCreate in počistiti input
  test('create form calls onCreate with trimmed name and clears input', async () => {
    const onCreate = jest.fn();
    render(<ShoppingListsManager lists={[]} onCreate={onCreate} onDelete={() => {}} onRename={() => {}} onOpen={() => {}} />);

    const input = screen.getByPlaceholderText(/Ime novega seznama/i);
    const button = screen.getByRole('button', { name: /Ustvari/i });

    await userEvent.type(input, '  Moj seznam  ');
    await userEvent.click(button);

    expect(onCreate).toHaveBeenCalledWith('Moj seznam');
    expect(input).toHaveValue('');
  });

  // Test: odprtje modala za preimenovanje in potrdi pokliče onRename z novim imenom
  test('rename modal opens and confirm triggers onRename', async () => {
    const lists = [{ _id: 'a', name: 'Seznam A' }];
    const onRename = jest.fn();
    render(<ShoppingListsManager lists={lists} onCreate={() => {}} onDelete={() => {}} onRename={onRename} onOpen={() => {}} />);

    const renameBtn = screen.getByRole('button', { name: /✏️/i });
    await userEvent.click(renameBtn);

    const modalInput = screen.getByPlaceholderText(/Novo ime/i);
    const confirm = screen.getByRole('button', { name: /Potrdi/i });

    await userEvent.clear(modalInput);
    await userEvent.type(modalInput, 'Nov naziv');
    await userEvent.click(confirm);

    expect(onRename).toHaveBeenCalledWith('a', 'Nov naziv');
  });

  // Test: klik na ime seznama sproži onOpen z id-jem seznama
  test('clicking list name calls onOpen', async () => {
    const lists = [{ _id: 'a', name: 'Seznam A' }];
    const onOpen = jest.fn();
    render(<ShoppingListsManager lists={lists} onCreate={() => {}} onDelete={() => {}} onRename={() => {}} onOpen={onOpen} />);

    const nameSpan = screen.getByText(/Seznam A/i);
    await userEvent.click(nameSpan);
    expect(onOpen).toHaveBeenCalledWith('a');
  });
});
