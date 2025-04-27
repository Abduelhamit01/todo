import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";

export default function Home() {
  type Item = {
    id: number;
    text: string;
  };

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("items");
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  const [value, setValue] = useState("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  function toggleEditing(id: React.SetStateAction<number | null>) {
    if (id === editingItemId) {
      setEditingItemId(null);
    } else {
      setEditingItemId(id);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("items", JSON.stringify(items));
  }

  function handleDelete(idToDelete: number) {
    const newList = items.filter((item) => item.id !== idToDelete);
    setItems(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value; // Hole den neuen Text

    // Erstelle eine neue Liste, in der nur das bearbeitete Item ersetzt wird
    const updatedItems = items.map((task) => {
      if (task.id === editingItemId) {
        // Wenn es das bearbeitete Item ist, ändere seinen Text
        return { ...task, text: newValue };
      } else {
        // Sonst lasse das Item unverändert
        return task;
      }
    });

    // Aktualisiere den State mit der neuen Liste
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center">
    <Navbar />
    <div className="w-full max-w-xl mt-10 bg-white rounded-xl shadow-lg p-8">

      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <input
            className="flex-1 border border-blue-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
            onChange={handleChange}
            value={value}
            type="text"
            placeholder="Task"
            aria-label="task"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
            type="submit"
            onClick={() => {
              const newItem = {
                id: Date.now(),
                text: value,
              };
              setItems([...items, newItem]);
              setValue("");
            }}
          >
            Add
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
            type="button"
            onClick={() => setItems([])}
          >
            Delete All
          </button>
        </form>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between bg-blue-50 rounded-lg shadow p-4 hover:bg-blue-100 transition"
          >
            {item.id === editingItemId ? (
              <input
                type="text"
                value={item.text}
                onChange={handleEditChange}
                className="flex-1 mr-3 border-b border-blue-300 focus:outline-none bg-transparent"
              />
            ) : (
              <span className="flex-1 text-gray-800 font-medium">{item.text}</span>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded transition"
                onClick={() => toggleEditing(item.id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}