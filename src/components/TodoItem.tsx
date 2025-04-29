import React, { useState } from "react";
import { Item } from "@/hooks/useTodos";

type TodoItemProps = {
  item: Item;
  isEditing: boolean;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onToggleEditing: () => void;
  onToggleDone: (id: number, done: boolean) => void;
};

export default function TodoItem({
  item,
  isEditing,
  onEditChange,
  onDelete,
  onToggleEditing,
  onToggleDone,
}: TodoItemProps) {
  const [show, setShow] = useState(false);

  return (
    <li className="flex items-center justify-between mt-7 bg-blue-50 rounded-lg shadow p-4 hover:bg-blue-100 transition">
      <input className="mr-5"
        type="checkbox"
        checked={item.done}
        onChange={(e) => onToggleDone(item.id, e.target.checked)}
      />
      {isEditing ? (
        <input
          type="textbox"
          value={item.text}
          onChange={onEditChange}
          className="flex-1 mr-3 border-b border-blue-200 focus:outline-none bg-transparent"
        />
      ) : (
        <span
          className={
            "flex-1 text-gray-800 font-medium" +
            (item.done ? " line-through text-gray-400" : "")
          }
        >
          {item.text}
        </span>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded transition"
          onClick={() => {
            onToggleEditing();
            setShow(!show);
          }}
        >
          {show ? "Save" : "Edit"}
        </button>
      </div>
    </li>
  );
}
