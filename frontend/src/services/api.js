import axios from "axios";

const API_URL = "/api/items";

// Get all items
export const getAllItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error("API Error - Get all items:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch items");
    }
};

// Create new item
export const createItem = async (title) => {
    try {
        const response = await axios.post(API_URL, { title });
        return response.data.data;
    } catch (error) {
        console.error("API Error - Create item:", error);
        throw new Error(error.response?.data?.error || "Failed to create item");
    }
};

// Update item
export const updateItem = async (id, title) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { title });
        return response.data.data;
    } catch (error) {
        console.error("API Error - Update item:", error);
        throw new Error(error.response?.data?.error || "Failed to update item");
    }
};

// Delete item
export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("API Error - Delete item:", error);
        throw new Error(error.response?.data?.error || "Failed to delete item");
    }
};
