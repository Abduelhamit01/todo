import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const {
    items,
    value,
    editingItemId,
    handleSubmit,
    handleAdd,
    handleClear,
    handleChange,
    handleEditChange,
    handleDelete,
    toggleEditing,
    onToggleDone,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-xl mt-10 bg-white rounded-xl shadow-lg p-8">
        <TodoForm
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onAdd={handleAdd}
          onClear={handleClear}
        />
        <TodoList
          items={items}
          editingItemId={editingItemId}
          onEditChange={handleEditChange}
          onDelete={handleDelete}
          onToggleEditing={toggleEditing}
          onToggleDone={onToggleDone}
        />
      </div>
    </div>
  );
}