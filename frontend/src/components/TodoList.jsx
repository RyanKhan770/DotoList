import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ items, onUpdate, onDelete }) {
    return (
        <>
        {items.map((item) => (
            <TodoItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
            />
        ))}
        </>
    );
}

export default TodoList;
