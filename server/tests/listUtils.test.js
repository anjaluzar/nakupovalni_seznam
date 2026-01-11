describe('listUtils', () => {
  // Test: addItemToList doda nov element na začetek in nastavi bought na false
  test('addItemToList adds new item at front with bought false', async () => {
    const { addItemToList } = await import('../utils/listUtils.js');
    const list = { _id: 'L1', name: 'A', items: [] };
    const updated = addItemToList(list, 'mleko');
    expect(updated.items.length).toBe(1);
    expect(updated.items[0].name).toBe('mleko');
    expect(updated.items[0].bought).toBe(false);
  });

  // Test: toggleItemBought preklopi bought pri določenem itemu
  test('toggleItemBought flips bought flag for target item', async () => {
    const { toggleItemBought } = await import('../utils/listUtils.js');
    const list = { items: [{ _id: '1', bought: false }, { _id: '2', bought: true }] };
    const updated = toggleItemBought(list, '1');
    expect(updated.items.find(i => i._id === '1').bought).toBe(true);
    expect(updated.items.find(i => i._id === '2').bought).toBe(true);
  });

  // Test: deleteItemFromList odstrani element z danim id-jem
  test('deleteItemFromList removes the item', async () => {
    const { deleteItemFromList } = await import('../utils/listUtils.js');
    const list = { items: [{ _id: '1' }, { _id: '2' }] };
    const updated = deleteItemFromList(list, '1');
    expect(updated.items.length).toBe(1);
    expect(updated.items.find(i => i._id === '1')).toBeUndefined();
  });

  // Test: renameListObject nastavi novo ime seznama
  test('renameListObject sets new name', async () => {
    const { renameListObject } = await import('../utils/listUtils.js');
    const list = { name: 'Old' };
    const updated = renameListObject(list, 'New');
    expect(updated.name).toBe('New');
  });

  // Test: nov element naj bo na začetku obstoječega seznama
  test('addItemToList preserves existing items and puts new item first', async () => {
    const { addItemToList } = await import('../utils/listUtils.js');
    const list = { items: [{ _id: 'a', name: 'first' }] };
    const updated = addItemToList(list, 'second');
    expect(updated.items.length).toBe(2);
    expect(updated.items[0].name).toBe('second');
    expect(updated.items[1].name).toBe('first');
  });

  // Test: če id ne obstaja, toggleItemBought ne spremeni ničesar
  test('toggleItemBought does nothing when id not found', async () => {
    const { toggleItemBought } = await import('../utils/listUtils.js');
    const list = { items: [{ _id: '1', bought: false }] };
    const updated = toggleItemBought(list, 'nope');
    expect(updated.items[0].bought).toBe(false);
  });

  // Test: deleteItemFromList ne naredi nič, če id ne obstaja
  test('deleteItemFromList does nothing when id not found', async () => {
    const { deleteItemFromList } = await import('../utils/listUtils.js');
    const list = { items: [{ _id: '1' }] };
    const updated = deleteItemFromList(list, 'nope');
    expect(updated.items.length).toBe(1);
  });
});
