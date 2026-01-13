import React, { useState } from "react";
import './ShoppingListsManager.css';

export default function ShoppingListsManager({ lists, onCreate, onDelete, onRename, onOpen }) {
  const [newListName, setNewListName] = useState("");
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renameTargetId, setRenameTargetId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName.trim() === "") return;
    onCreate(newListName.trim());
    setNewListName("");
  };

  const handleRename = (id, currentName) => {
    setRenameTargetId(id);
    setRenameValue(currentName);
    setRenameModalOpen(true);
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
<button onClick={() => handleRename(list._id, list.name)}>✏️</button>
       <button onClick={() => onDelete(list._id)}>🗑️</button>
     </div>
   </li>
  ))}
</ul>
      )}
      {renameModalOpen && (
  <div className="modal-backdrop">
    <div className="modal">
      <h3>Preimenuj seznam</h3>

      <input
        type="text"
        value={renameValue}
        onChange={(e) => setRenameValue(e.target.value)}
        placeholder="Novo ime..."
      />

      <div className="modal-actions">
        <button
  className="confirm"
  onClick={() => {
    onRename(renameTargetId, renameValue.trim());
    setRenameModalOpen(false);
  }}
>
  Potrdi
</button>

<button className="cancel" onClick={() => setRenameModalOpen(false)}>
  Prekliči
</button>

      </div>
    </div>
  </div>
)}

    </div>
  );
}
