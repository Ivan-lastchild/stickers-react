import React, { useState } from "react";
import "./style.css";
import Card from "../Card";
import dataURL from "../../Data/data";
import axios from "axios";
import { Route, Routes, useParams, Link } from "react-router-dom";

export default function Board(props) {
    const { card, setCard } = props;
    const [cardIdText, setCardIdText] = useState(null);

    function deleteCard(id) {
        axios.delete(dataURL + "/" + id);
        const updateListCard = card.filter((item) => item.id !== id);
        setCard(updateListCard);
    }

    function GetCardById() {
        const { id } = useParams();
        axios
            .get(dataURL + "/" + id)
            .then((resp) => setCardIdText(resp.data.description));
        return (
            <Card id={id} description={cardIdText} deleteCard={deleteCard} />
        );
    }

    return (
        <div className="board-body">
            <Routes>
                <Route
                    path="/"
                    element={card.map((item) => (
                        <Link to={`cards/${item.id}`} key={item.id}>
                            <Card
                                id={item.id}
                                description={item.description}
                                deleteCard={deleteCard}
                            />
                        </Link>
                    ))}
                />
                <Route path="cards/:id" element={<GetCardById />} />
            </Routes>
        </div>
    );
}
