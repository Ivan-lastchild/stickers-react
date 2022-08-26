import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import dataURL from "./Data/data";
import EmptyCard from "./components/EmptyCard";
import axios from "axios";
import ContextTheme from "./Context/ContextTheme";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    const [card, setCard] = useState([]);
    const [addingCard, setAddingCard] = useState(false);

    const ThemeParam = {
        light: {
            background: "#cee6f7",
            color: "#0d5378",
        },
        dark: {
            background: "#455ca3",
            color: "#f8efed",
        },
    };

    const [theme, setTheme] = useState(ThemeParam.light);
    const [toggleTheme, setToggleTheme] = useState(false);

    useEffect(() => {
        axios.get(dataURL).then((resp) => setCard(resp.data));
    }, []);

    function addCard() {
        setAddingCard(true);
    }

    function changeTheme() {
        if (toggleTheme) {
            setTheme(ThemeParam.light);
        } else setTheme(ThemeParam.dark);
        setToggleTheme(!toggleTheme);
    }

    return (
        <ContextTheme.Provider value={{ theme, setTheme }}>
            <BrowserRouter>
                <div className="board" >
                    <div className="header-board">
                        <button
                            className="add-card-btn"
                            onClick={addCard}
                            style={{
                                display: addingCard ? "none" : "inline-block",
                            }}
                        >
                            Add card
                        </button>
                        <button
                            className="change-theme-btn"
                            onClick={() => changeTheme()}
                        >
                            Change theme
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
            </BrowserRouter>
        </ContextTheme.Provider>
    );
}
