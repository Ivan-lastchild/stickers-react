import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import dataURL from "./Data/data";
import EmptyCard from "./components/EmptyCard";
import axios from "axios"

export default function App() {
  const [card, setCard] = useState([]);
  const [addingCard, setAddingCard] = useState(false);

  useEffect(() => {
    axios.get(dataURL)
      .then(resp => setCard(resp.data));
  }, []);

  function addCard() {
    setAddingCard(true);
  }

  return (
    <div className="board">
      <div className="header-board">
        <button className="add-card-btn" onClick={addCard}>
          {!addingCard ? "Add card" : ""}
        </button>
      </div>
      {!addingCard ? (
        <Board card={card} setCard={setCard} />
      ) : (
        <EmptyCard
          card={card}
          setCard={setCard}
          addingCard={addingCard}
          setAddingCard={setAddingCard}
        />
      )}
    </div>
  );
}
