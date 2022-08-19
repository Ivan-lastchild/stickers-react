import React, { useState } from "react";
import dataURL from "../../Data/data";
import axios from "axios";

export default function Card(props) {
    const {id, description, deleteCard} = props;
    const [btnSaveHide, setBtnSaveHide] = useState(true);
    const [btnEditHide, setBtnEditHide] = useState (false);
    const [textareaHide, setTextareaHide] = useState(true);
    const [cardText, setCardText] = useState(description)

    function editCard(){
        setBtnSaveHide(!btnSaveHide);
        setBtnEditHide(!btnEditHide);
        setTextareaHide(false);
    }

    function saveCard(id){
        setBtnEditHide(!btnEditHide);
        setBtnSaveHide(!btnSaveHide);
        setTextareaHide(true);

        axios.put(dataURL + "/" + id, {
            description: cardText
        })
    }

    return (
        <div className = "stickers-card">
            <div className="title">
                FlashCard {id}
            </div>
            <div className="cardText">
                {cardText} 
            </div>
            <textarea 
                defaultValue = {description}
                className={"editField" + (textareaHide ? "-hide" : "")}
                onChange={e => setCardText(e.target.value)}
            />
            <div className="control">
                <button 
                    onClick={() => saveCard(id)} 
                    className={"button-save" + (btnSaveHide ? "-hide" : "")}
                >
                    Save
                </button>
                <button 
                    className={"button-edit" + (btnEditHide ? "-hide" : "")}
                    onClick={() => editCard()} 
                >
                    Edit
                </button>
                <button 
                    onClick={() => deleteCard(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}