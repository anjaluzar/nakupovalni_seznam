import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import ShoppingList from "../models/ShoppingList.js";

const router = express.Router();

/**
 * Rate limiting (odpravi "Missing rate limiting")
 * 100 zahtevkov na 15 min na IP (prilagodi po potrebi)
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(limiter);

router.get("/", async (req, res) => {
  try {
    const lists = await ShoppingList.find();
    res.json(lists);
  } catch (err) {
    console.error("Napaka pri pridobivanju seznamov:", err);
    res.status(500).json({ message: "Napaka pri pridobivanju seznamov" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Whitelist dovoljenih polj (odpravi mass assignment / user-controlled source issue)
    const { name, items } = req.body;

    const list = new ShoppingList({ name, items });
    await list.save();

    res.status(201).json(list);
  } catch (err) {
    console.error("Napaka pri ustvarjanju seznama:", err);
    res.status(400).json({ message: "Neveljavni podatki" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Neveljaven ID" });
    }

    // Whitelist dovoljenih polj
    const { name, items } = req.body;

    const updated = await ShoppingList.findByIdAndUpdate(
      req.params.id,
      { name, items },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Seznam ne obstaja" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Napaka pri posodobitvi seznama:", err);
    res.status(500).json({ message: "Napaka pri posodobitvi seznama" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Neveljaven ID" });
    }

    const deleted = await ShoppingList.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Seznam ne obstaja" });
    }

    res.json({ message: "Seznam izbrisan" });
  } catch (err) {
    console.error("Napaka pri brisanju seznama:", err);
    res.status(500).json({ message: "Napaka pri brisanju seznama" });
  }
});

export default router;
