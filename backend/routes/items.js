import express from "express";
import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
} from "../controllers/itemsController.js";

const router = express.Router();

// GET all items
router.get("/", getAllItems);

// POST create new item
router.post("/", createItem);

// PUT update item
router.put("/:id", updateItem);

// DELETE item
router.delete("/:id", deleteItem);

export default router;
