import React, { useState } from "react";

function AddItem({ onAdd }) {
    const [value, setValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (value.trim()) {
        const success = await onAdd(value);
        if (success) {
            setValue("");
        }
        }
    };

    return (
        <form className="item" onSubmit={handleSubmit}>
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="New Item"
            autoComplete="off"
            autoFocus
        />
        <button className="add" type="submit">
            +
        </button>
        </form>
    );
}

export default AddItem;
