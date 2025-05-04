import React, { useState, useEffect, useRef } from "react";

export type Item = { id: number; text: string, done: boolean };

export function useTodos() {
  const [items, setItems] = useState<Item[]>([]);
  const [value, setValue] = useState("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const timersRef = useRef<Map<number, NodeJS.Timeout>>(new Map());



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
    timersRef.current.delete(id);

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
    // Erst alten Timer aufräumen (falls vorhanden)
    const existingTimer = timersRef.current.get(id);
    if (existingTimer) {
        clearTimeout(existingTimer);
        timersRef.current.delete(id);
    }

    // Items updaten
    const updatedItems = items.map(item => item.id===id ? {...item, done} : item);    
    setItems(updatedItems);

    
    // Timer nur setzen wenn done=true
    if (done) {
        const timer = setTimeout(() => {
            setItems(prevItems => prevItems.filter(item => item.id !== id));
            timersRef.current.delete(id);
        }, 3000);
        timersRef.current.set(id, timer);
    }
  }

  function useKeyboardShortcut({ key, onKeyPressed }: { key: string, onKeyPressed: () => void }) {
    useEffect(() => {
      function keyDownHandler(e: KeyboardEvent) {
        if (e.key === key) {
          e.preventDefault();
          onKeyPressed();
        }
      }
      document.addEventListener("keydown", keyDownHandler);
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }, [key]);
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
