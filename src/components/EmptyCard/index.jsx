import React, { useState } from "react";
import dataURL from "../../Data/data";
import "./style.css";
import axios from "axios";

export default function EmptyCard(props) {
  const { card, setCard, addingCard, setAddingCard } = props;
  const [newCardText, setNewCardText] = useState("");

  function addCard() {
    axios
      .post(dataURL, {
        description: newCardText,
      })
      .then(resp => setCard([...card, resp.data]));
    setAddingCard(!addingCard);
  }

  function cancelAdd() {
    setAddingCard(!addingCard);
  }

  return (
    <div className="stickers-card">
      <div className="title">New card</div>
      <textarea
        className="editField"
        placeholder="Write the text"
        onChange={(e) => setNewCardText(e.target.value)}
      />
      <div className="control">
        <button onClick={() => addCard()}>Save</button>
        <button onClick={() => cancelAdd()}>Cancel</button>
      </div>
    </div>
  );
}
