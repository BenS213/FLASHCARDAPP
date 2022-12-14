    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { createCard } from "./api/createCard";
    import { deleteDeck } from "./api/deleteDecks";
    import { Routes, Route, useParams } from "react-router-dom"
    import { getDecks, TDeck } from "./api/getDecks";
    import "./App.css";
    
    export default function Deck() {
    
      const [cards, setCards] = useState<string[]>([]);
      const [text, setText] = useState("");
      const { deckId } = useParams();
      
      async function handleCreateCard(e: React.FormEvent) {
          e.preventDefault();
          const {cards: serverCards} = await createCard(deckId!, text);
          setCards(serverCards);
        setText("");
    }
    
    // async function handleDeleteDeck(deckId: string) {
    //     await deleteDeck(deckId);
    //     setText(text.filter(deck => deck._id !== deckId))
    //   }
      
    //   useEffect(() => {
    //       async function fetchDecks() {
    //           const newDecks = await getDecks();
    //           setText(newDecks)
    //     }
    //     fetchDecks();
    // }, []);
    
    return (
        <div className="App">
          <ul className="decks">
            {cards.map((card) => (
              <li key={card}>
                {/* <button onClick={() => handleDeleteCard(card._id)}>X</button> */}
                {card}
                </li>))}
          </ul>
          <form onSubmit={handleCreateCard}>
            <label htmlFor="card-text">Card</label>
            <input
              id="card-text"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
              }}
            />
            <button>Create Deck</button>
          </form>
        </div>
      );
    }