import React, { useContext, useState } from "react";
import dataURL from "../../Data/data";
import axios from "axios";
import ContextTheme from "../../Context/ContextTheme";
import { Link } from "react-router-dom";

export default function Card(props) {
    const { id, description, deleteCard} = props;
    const [btnSaveHide, setBtnSaveHide] = useState(true);
    const [btnEditHide, setBtnEditHide] = useState(false);
    const [textareaHide, setTextareaHide] = useState(true);
    const [cardText, setCardText] = useState(description);
    const { theme } = useContext(ContextTheme);

    function editCard() {
        setBtnSaveHide(!btnSaveHide);
        setBtnEditHide(!btnEditHide);
        setTextareaHide(false);
    }

    function saveCard(id) {
        axios.put(dataURL + "/" + id, {
            description: cardText,
        })
        .then(resp => setCardText(resp.data.description))

        setBtnEditHide(!btnEditHide);
        setBtnSaveHide(!btnSaveHide);
        setTextareaHide(true);
    }

    return (
        <div className="stickers-card" style={theme}>
            <div className="title">FlashCard {id}</div>
            <div className="cardText">{cardText}</div>
            <textarea
                defaultValue={description}
                className={"editField" + (textareaHide ? "-hide" : "")}
                onChange={(e) => setCardText(e.target.value)}
            />
            <div className="control">
                <Link to="/">
                    <button
                        onClick={() => saveCard(id)}
                        className={"button-save" + (btnSaveHide ? "-hide" : "")}
                    >
                        Save
                    </button>
                </Link>
                <button
                    className={"button-edit" + (btnEditHide ? "-hide" : "")}
                    onClick={() => editCard()}
                >
                    Edit
                </button>
                <Link to="/">
                    <button onClick={() => deleteCard(id)}>Delete</button>
                </Link>
            </div>
        </div>
    );
}
