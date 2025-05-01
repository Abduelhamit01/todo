import React, { useState, useEffect, useRef } from "react";

export type Item = { id: number; text: string, done: boolean };

export function useTodos() {
  const [items, setItems] = useState<Item[]>([]);
  const [value, setValue] = useState("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);



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

  function toggleEditing(id: number) {
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

  function handleDelete(id: number) {
    const newList = items.filter(item => item.id !== id);
    setItems(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    const updatedItems = items.map(task =>
      task.id === editingItemId ? { ...task, text: newValue } : task
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  function handleAdd() {
    const newItem = { id: Date.now(), text: value, done: false };
    setItems([...items, newItem]);
    setValue("");
  }

  function handleClear() {
    setItems([]);
  }

  function onToggleDone(id: number, done: boolean){
    const updatedItems = items.map(item => item.id===id ? {...item, done} : item);    
    if (done) {
        timerRef.current = setTimeout(() => handleDelete(id), 3000)
      }
      else {
        if(timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }

    setItems(updatedItems);
  }

  return {
    items,
    value,
    editingItemId,
    setValue,
    toggleEditing,
    handleSubmit,
    handleDelete,
    handleChange,
    handleEditChange,
    handleAdd,
    handleClear,
    onToggleDone
  };
}
