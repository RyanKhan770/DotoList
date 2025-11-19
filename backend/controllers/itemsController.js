import { query } from "../config/database.js";

// Get all items
export const getAllItems = async (req, res) => {
    try {
        const result = await query("SELECT * FROM items ORDER BY id ASC");
        res.json({
        success: true,
        data: result.rows,
        });
    } catch (error) {
        console.error("Error fetching items:", error.message);
        res.status(500).json({
        success: false,
        error: "Failed to fetch items",
        });
    }
};

// Create new item
export const createItem = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            error: "Title is required",
        });
        }

        const result = await query(
        "INSERT INTO items (title) VALUES ($1) RETURNING *",
        [title.trim()]
        );

        res.status(201).json({
        success: true,
        data: result.rows[0],
        });
    } catch (error) {
        console.error("Error creating item:", error.message);
        res.status(500).json({
        success: false,
        error: "Failed to create item",
        });
    }
};

// Update item
export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            error: "Title is required",
        });
        }

        const result = await query(
        "UPDATE items SET title = $1 WHERE id = $2 RETURNING *",
        [title.trim(), id]
        );

        if (result.rows.length === 0) {
        return res.status(404).json({
            success: false,
            error: "Item not found",
        });
        }

        res.json({
        success: true,
        data: result.rows[0],
        });
    } catch (error) {
        console.error("Error updating item:", error.message);
        res.status(500).json({
        success: false,
        error: "Failed to update item",
        });
    }
};

// Delete item
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query("DELETE FROM items WHERE id = $1 RETURNING *", [
        id,
        ]);

        if (result.rows.length === 0) {
        return res.status(404).json({
            success: false,
            error: "Item not found",
        });
        }

        res.json({
        success: true,
        message: "Item deleted successfully",
        data: result.rows[0],
        });
    } catch (error) {
        console.error("Error deleting item:", error.message);
        res.status(500).json({
        success: false,
        error: "Failed to delete item",
        });
    }
};
