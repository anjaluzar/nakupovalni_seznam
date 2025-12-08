export function addItemToList(list, itemName) {
  const newItem = { _id: String(Date.now()) + Math.random().toString(36).slice(2), name: itemName, bought: false };
  return { ...list, items: [newItem, ...(list.items || [])] };
}

export function toggleItemBought(list, itemId) {
  return {
    ...list,
    items: (list.items || []).map((i) => (i._id === itemId ? { ...i, bought: !i.bought } : i)),
  };
}

export function deleteItemFromList(list, itemId) {
  return { ...list, items: (list.items || []).filter((i) => i._id !== itemId) };
}

export function renameListObject(list, newName) {
  return { ...list, name: newName };
}
