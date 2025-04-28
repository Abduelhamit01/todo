import React from "react";
import { Item } from "@/hooks/useTodos";
import TodoItem from "@/components/TodoItem";

type TodoListProps = {
  items: Item[];
  editingItemId: number | null;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: number) => void;
  onToggleEditing: (id: number) => void;
  onToggleDone: (id: number, done: boolean) => void;
};

export default function TodoList({
  items,
  editingItemId,
  onEditChange,
  onDelete,
  onToggleEditing,
  onToggleDone,
}: TodoListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          isEditing={editingItemId === item.id}
          onEditChange={onEditChange}
          onDelete={() => onDelete(item.id)}
          onToggleEditing={() => onToggleEditing(item.id)}
          onToggleDone={onToggleDone}
          />
      ))}
    </ul>
  );
}
