import React from "react";
import "./style.css";
import Card from "../Card";
import dataURL from "../../Data/data";
import axios from "axios"

export default function Board(props) {
  const { card, setCard } = props;

  function deleteCard(id) {
    axios.delete(dataURL + "/" + id);
    const updateListCard = card.filter((item) => item.id !== id);
    setCard(updateListCard);
  }

  return (
    <div className="board-body">
      {card.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          description={item.description}
          deleteCard={deleteCard}
        />
      ))}
    </div>
  );
}
