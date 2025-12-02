import React, { useState } from "react";

export default function AddItemForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="Dodaj izdelek..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Dodaj</button>
    </form>
  );
}
