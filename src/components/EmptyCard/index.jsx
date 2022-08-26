import React, { useContext, useState } from "react";
import dataURL from "../../Data/data";
import "./style.css";
import axios from "axios";
import ContextTheme from "../../Context/ContextTheme";

export default function EmptyCard(props) {
    const { card, setCard, addingCard, setAddingCard } = props;
    const [newCardText, setNewCardText] = useState("");
    const {theme} = useContext(ContextTheme)

    function addCard() {
        if (!newCardText) {
            alert("write smth in the card`s placeholder");
            return;
        } else {
            setNewCardText(newCardText);
        }

        axios
            .post(dataURL, {
                description: newCardText,
            })
            .then((resp) => setCard([...card, resp.data]));
            
        setAddingCard(!addingCard);
    }

    function cancelAdd() {
        setAddingCard(!addingCard);
    }

    return (
        <div className="stickers-card" style={theme}>
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
