import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import { getAllItems, createItem, updateItem, deleteItem } from "./services/api";

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  // Fetch items on component mount
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
        setLoading(true);
        setError(null);
        const data = await getAllItems();
        setItems(data);
        } catch (err) {
        setError("Failed to load items. Please try again.");
        console.error("Error fetching items:", err);
        } finally {
        setLoading(false);
        }
    };

    const handleAddItem = async (title) => {
        try {
        const newItem = await createItem(title);
        setItems([...items, newItem]);
        return true;
        } catch (err) {
        setError("Failed to add item. Please try again.");
        console.error("Error adding item:", err);
        return false;
        }
    };

    const handleUpdateItem = async (id, newTitle) => {
        try {
        const updatedItem = await updateItem(id, newTitle);
        setItems(items.map((item) => (item.id === id ? updatedItem : item)));
        return true;
        } catch (err) {
        setError("Failed to update item. Please try again.");
        console.error("Error updating item:", err);
        return false;
        }
    };

    const handleDeleteItem = async (id) => {
        try {
        await deleteItem(id);
        setItems(items.filter((item) => item.id !== id));
        return true;
        } catch (err) {
        setError("Failed to delete item. Please try again.");
        console.error("Error deleting item:", err);
        return false;
        }
    };

    return (
        <>
        <Header title="Today" />
        <main>
            <div className="box">
            {error && (
                <div className="error-message">
                {error}
                <button onClick={() => setError(null)}>×</button>
                </div>
            )}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                <TodoList
                    items={items}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
                <AddItem onAdd={handleAddItem} />
                </>
            )}
            </div>
        </main>
        <Footer />
        </>
    );
}

export default App;
