import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  bought: Boolean,
});

const ShoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [ItemSchema],
});

export default mongoose.model("ShoppingList", ShoppingListSchema);
