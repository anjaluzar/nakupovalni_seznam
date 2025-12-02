import React, { useState } from "react";

export default function ShoppingListsManager({ lists, onCreate, onDelete, onRename, onOpen }) {
  const [newListName, setNewListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName.trim() === "") return;
    onCreate(newListName.trim());
    setNewListName("");
  };

  const handleRename = (id) => {
    const newName = prompt("Novo ime seznama:");
    if (newName && newName.trim() !== "") onRename(id, newName.trim());
  };

  return (
    <div className="lists-manager">
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Ime novega seznama..."
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button type="submit">Ustvari</button>
      </form>

      {lists.length === 0 ? (
        <p className="empty">Nimaš še nobenega seznama 🧺</p>
      ) : (
       <ul className="lists">
  {lists.map((list) => (
   <li key={list._id} className="list-item">
     <span onClick={() => onOpen(list._id)}>{list.name}</span>
     <div className="actions">
       <button onClick={() => handleRename(list._id)}>✏️</button>
       <button onClick={() => onDelete(list._id)}>🗑️</button>
     </div>
   </li>
  ))}
</ul>
      )}
    </div>
  );
}
