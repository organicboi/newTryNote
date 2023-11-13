// frontend/src/App.js
import React, { useState, useEffect } from "react";

const App = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [entries, setEntries] = useState([]);
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // console.log(backendUrl);

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/addEntry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            amount,
          }),
        }
      );

      if (response.ok) {
        fetchEntries();
        setDescription("");
        setAmount(0);
      } else {
        console.error("Failed to add entry");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/getEntries`
      );

      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        console.error("Failed to fetch entries");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="app">
      <header>
        <h1>Money Tracker</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addEntry();
          }}
        >
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.valueAsNumber)}
            required
          />
          <button type="submit">Add Entry</button>
        </form>
      </header>
      <main>
        <h2>Recent Entries</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              {entry.description} - ${entry.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
