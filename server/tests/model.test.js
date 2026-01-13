describe('ShoppingList model validation', () => {
  // Test: polje `name` je obvezno v schemi ShoppingList
  test('requires name field', async () => {
    const mongoose = await import('mongoose');
    const { default: ShoppingList } = await import('../models/ShoppingList.js');
    const doc = new ShoppingList({ items: [] });
    const err = doc.validateSync();
    expect(err).toBeTruthy();
    expect(err.errors.name).toBeTruthy();
  });

  // Test: schema sprejme item z lastnostma `name` in `bought`
  test('accepts items with name and bought', async () => {
    const mongoose = await import('mongoose');
    const { default: ShoppingList } = await import('../models/ShoppingList.js');
    const doc = new ShoppingList({ name: 'Test', items: [{ name: 'mleko', bought: false }] });
    const err = doc.validateSync();
    expect(err).toBeUndefined();
    expect(doc.items[0].name).toBe('mleko');
  });

  // Test: schemi je dovoljeno imeti več itemov v nizu
  test('item schema allows multiple items', async () => {
    const mongoose = await import('mongoose');
    const { default: ShoppingList } = await import('../models/ShoppingList.js');
    const doc = new ShoppingList({ name: 'X', items: [{ name: 'a' }, { name: 'b' }] });
    expect(doc.items.length).toBe(2);
  });
});
