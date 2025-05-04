import { useTodos } from "@/hooks/useTodos";
import React from "react";

type TodoFormProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onAdd: () => void;
  onClear: () => void;
};

export default function TodoForm({ value, onChange, onSubmit, onAdd, onClear }: TodoFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full flex gap-2">
      <input id="task-input" name="task"
        className="flex-1 border border-blue-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
        onChange={onChange}
        value={value}
        type="text"
        placeholder="Task"
        aria-label="task"
        onKeyDown={e => {
          if(e.key === "Enter") {
            onAdd();
          }
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
        type="button"
        onClick={onAdd}
      >
        Add
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
        type="button"
        onClick={onClear}
      >
        Delete All
      </button>
    </form>
  );
}
