import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItemForm from "./components/AddItemForm";
import ShoppingList from "./components/ShoppingList";
import ShoppingListsManager from "./components/ShoppingListsManager";
import "./App.css";

export default function App() {
  const [lists, setLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);

  // ✅ API URL iz ENV (Vercel) ali fallback na Render backend
  const API_BASE =
    process.env.REACT_APP_API_URL || "https://nakupovalni-server.onrender.com";

  // 🔹 Ob zagonu aplikacije pridobi sezname iz baze
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/lists`)
      .then((res) => setLists(res.data))
      .catch((err) => console.error("Napaka pri branju seznamov:", err));
  }, [API_BASE]);

  // 🔹 Dodaj nov seznam
  const createList = async (name) => {
    try {
      const res = await axios.post(`${API_BASE}/api/lists`, { name, items: [] });
      setLists([res.data, ...lists]);
    } catch (err) {
      console.error("Napaka pri ustvarjanju seznama:", err);
    }
  };

  // 🔹 Izbriši seznam
  const deleteList = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/lists/${id}`);
      setLists(lists.filter((list) => list._id !== id));
      if (id === activeListId) setActiveListId(null);
    } catch (err) {
      console.error("Napaka pri brisanju seznama:", err);
    }
  };

  // 🔹 Preimenuj seznam
  const renameList = async (id, newName) => {
    try {
      const res = await axios.put(`${API_BASE}/api/lists/${id}`, { name: newName });
      setLists(lists.map((list) => (list._id === id ? res.data : list)));
    } catch (err) {
      console.error("Napaka pri preimenovanju seznama:", err);
    }
  };

  // 🔹 Dodaj izdelek v seznam
  const addItem = async (name) => {
    try {
      const current = lists.find((l) => l._id === activeListId);
      if (!current) return;

      const updatedItems = [{ name, bought: false }, ...current.items];

      const res = await axios.put(`${API_BASE}/api/lists/${activeListId}`, {
        ...current,
        items: updatedItems,
      });

      setLists(lists.map((l) => (l._id === activeListId ? res.data : l)));
    } catch (err) {
      console.error("Napaka pri dodajanju izdelka:", err);
    }
  };

  // 🔹 Označi izdelek kot kupljen
  const toggleBought = async (itemId) => {
    try {
      const current = lists.find((l) => l._id === activeListId);
      if (!current) return;

      const updatedItems = current.items.map((i) =>
        i._id === itemId ? { ...i, bought: !i.bought } : i
      );

      const res = await axios.put(`${API_BASE}/api/lists/${activeListId}`, {
        ...current,
        items: updatedItems,
      });

      setLists(lists.map((l) => (l._id === activeListId ? res.data : l)));
    } catch (err) {
      console.error("Napaka pri posodabljanju izdelka:", err);
    }
  };

  // 🔹 Izbriši izdelek
  const deleteItem = async (itemId) => {
    try {
      const current = lists.find((l) => l._id === activeListId);
      if (!current) return;

      const updatedItems = current.items.filter((i) => i._id !== itemId);

      const res = await axios.put(`${API_BASE}/api/lists/${activeListId}`, {
        ...current,
        items: updatedItems,
      });

      setLists(lists.map((l) => (l._id === activeListId ? res.data : l)));
    } catch (err) {
      console.error("Napaka pri brisanju izdelka:", err);
    }
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
