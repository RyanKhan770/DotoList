import React, { useState } from "react";

function TodoItem({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(item.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (editValue.trim()) {
        const success = await onUpdate(item.id, editValue);
        if (success) {
            setIsEditing(false);
        }
        }
    };

    const handleDelete = async () => {
        await onDelete(item.id);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
        setEditValue(item.title);
        setIsEditing(false);
        }
    };

    return (
        <div className="item">
        <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
            <input
            type="checkbox"
            onChange={handleDelete}
            aria-label="Delete item"
            />
        </form>

        {isEditing ? (
            <form className="edit" onSubmit={handleSave}>
            <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
            />
            <button className="edit" type="submit" aria-label="Save">
                <img
                className="icon"
                src="/assets/icons/check-solid.svg"
                alt="Save"
                />
            </button>
            </form>
        ) : (
            <>
            <p>{item.title}</p>
            <button className="edit" onClick={handleEdit} aria-label="Edit">
                <img
                className="icon"
                src="/assets/icons/pencil-solid.svg"
                alt="Edit"
                />
            </button>
            </>
        )}
        </div>
    );
}

export default TodoItem;
