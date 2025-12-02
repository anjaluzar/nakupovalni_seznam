import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItemForm from "./components/AddItemForm";
import ShoppingList from "./components/ShoppingList";
import ShoppingListsManager from "./components/ShoppingListsManager";
import "./App.css";

export default function App() {
  const [lists, setLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);

  // 🔹 Ob zagonu aplikacije pridobi sezname iz baze
  useEffect(() => {
    axios.get("http://localhost:5000/api/lists")
      .then((res) => setLists(res.data))
      .catch((err) => console.error("Napaka pri branju seznamov:", err));
  }, []);

  // 🔹 Dodaj nov seznam
  const createList = async (name) => {
    try {
      const res = await axios.post("http://localhost:5000/api/lists", { name, items: [] });
      setLists([res.data, ...lists]);
    } catch (err) {
      console.error("Napaka pri ustvarjanju seznama:", err);
    }
  };

  // 🔹 Izbriši seznam
  const deleteList = async (id) => {
    await axios.delete(`http://localhost:5000/api/lists/${id}`);
    setLists(lists.filter((list) => list._id !== id));
    if (id === activeListId) setActiveListId(null);
  };

  // 🔹 Preimenuj seznam
  const renameList = async (id, newName) => {
    const res = await axios.put(`http://localhost:5000/api/lists/${id}`, { name: newName });
    setLists(lists.map((list) => (list._id === id ? res.data : list)));
  };

  // 🔹 Dodaj izdelek v seznam
  const addItem = async (name) => {
    const current = lists.find((l) => l._id === activeListId);
    const updatedItems = [{ name, bought: false }, ...current.items];
    const res = await axios.put(`http://localhost:5000/api/lists/${activeListId}`, {
      ...current,
      items: updatedItems,
    });
    setLists(lists.map((l) => (l._id === activeListId ? res.data : l)));
  };

  // 🔹 Označi izdelek kot kupljen
  const toggleBought = async (itemId) => {
    const current = lists.find((l) => l._id === activeListId);
    const updatedItems = current.items.map((i) =>
      i._id === itemId ? { ...i, bought: !i.bought } : i
    );
    const res = await axios.put(`http://localhost:5000/api/lists/${activeListId}`, {
      ...current,
      items: updatedItems,
    });
    setLists(lists.map((l) => (l._id === activeListId ? res.data : l)));
  };

  // 🔹 Izbriši izdelek
  const deleteItem = async (itemId) => {
    const current = lists.find((l) => l._id === activeListId);
    const updatedItems = current.items.filter((i) => i._id !== itemId);
    const res = await axios.put(`http://localhost:5000/api/lists/${activeListId}`, {
      ...current,
      items: updatedItems,
    });
    setLists(lists.map((l) => (l._id === activeListId ? res.data : l)));
  };

  const activeList = lists.find((l) => l._id === activeListId);

  return (
    <div className="app">
      <h1>🛒 Nakupovalni seznami</h1>
      {!activeList ? (
        <ShoppingListsManager
          lists={lists}
          onCreate={createList}
          onDelete={deleteList}
          onRename={renameList}
          onOpen={setActiveListId}
        />
      ) : (
        <>
          <button className="back-btn" onClick={() => setActiveListId(null)}>
            ← Nazaj na sezname
          </button>
          <h2>{activeList.name}</h2>
          <AddItemForm onAdd={addItem} />
          <ShoppingList
            items={activeList.items}
            onToggle={toggleBought}
            onDelete={deleteItem}
          />
        </>
      )}
    </div>
  );
}
