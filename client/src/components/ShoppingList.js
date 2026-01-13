import React from "react";

export default function ShoppingList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return <p className="empty">Seznam je prazen 🧺</p>;
  }

  return (
    <ul className="shopping-list">
      {items.map((item) => (
        <li
          key={item._id}
          className={item.bought ? "bought" : ""}
          onClick={() => onToggle(item._id)}
        >
          {item.name}
          <button
            className="delete-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
}
