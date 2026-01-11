import express from "express";
import ShoppingList from "../models/ShoppingList.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const lists = await ShoppingList.find();
  res.json(lists);
});

router.post("/", async (req, res) => {
  const list = new ShoppingList(req.body);
  await list.save();
  res.json(list);
});

router.put("/:id", async (req, res) => {
  try {
    const { name, items } = req.body;
    const updated = await ShoppingList.findByIdAndUpdate(
      req.params.id,
      { name, items },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Napaka pri posodobitvi seznama:", err);
    res.status(500).json({ message: "Napaka pri posodobitvi seznama" });
  }
});


router.delete("/:id", async (req, res) => {
  await ShoppingList.findByIdAndDelete(req.params.id);
  res.json({ message: "Seznam izbrisan" });
});

export default router;
