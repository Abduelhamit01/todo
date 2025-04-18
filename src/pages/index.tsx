import React, { useState } from "react";
import { text } from "stream/consumers";

export default function Home() {
  type Item = {
    id: number;
    text: string;
  };

  const [items, setItems] = useState<Item[]>([]);

  const listItems = items.map((item) => (
    <li key={item.id}>
      {item.text}
      <button
        type="button"
        className="ml-2 text-red-500"
        onClick={() => handleDeleteAll(item.id)}
      >
        Delete
      </button>
    </li>
  ));

  const [value, setValue] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(value);
  }

  function handleDeleteAll(idToDelete: number) {
    const newList = items.filter((item) => item.id !== idToDelete);
    setItems(newList);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Todo App</h1>
      <div className="flex p-2">
        <form onSubmit={handleSubmit}>
          <label className="flex gap-2">
            <input
              className="border-1 border-black-300 rounded-md p-2"
              onChange={handleChange}
              value={value}
              type="text"
            />
            <button
              className="flex bg-blue-500 text-white p-2 rounded-md border border-transparent"
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
              className="bg-red-500 text-white p-2 rounded-md border border-transparent"
              type="button"
              onClick={handleDeleteAll}
            >
              Delete All
            </button>
          </label>
        </form>
      </div>
      <ul>{listItems}</ul>
    </div>
  );
}
