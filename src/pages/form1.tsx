import { useState } from "react";

const Form1 = () => {
  const [name, setName] = useState("");

  return (
    <form>
      <input               
        className="ml-2 border-1 border-black-300 rounded-md p-2"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        aria-label="fullname"
      />
      <input className="ml-1 boarder-1 bg-blue-500 rounded-md text-white p-2" type="submit" value="Submit"></input>
    </form>
  );
};

export default Form1;