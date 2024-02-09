import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "./Cards.css";
import Card from "./Card";
import { v4 as uuid } from "uuid";

const Cards = () => {
  const INITIAL_VALUES = [];
  const [cardList, setCards] = useState(INITIAL_VALUES);
  const [remaining, setRemaining] = useState(52);
  const [shuffle, setShuffle] = useState(0);
  const deckId = useRef();
  useEffect(() => {
    async function get_deckId() {
      const res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      );
      deckId.current = res.data.deck_id;
    }
    get_deckId();
    console.log(deckId);
  }, [shuffle]);
  const drawCard = async () => {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`,
    );

    setCards(() => [...cardList, { ...res.data.cards[0], id: uuid() }]);
    console.log(res.data.remaining);
    setRemaining(res.data.remaining);
  };
  const newShuffle = () => {
    setCards(INITIAL_VALUES);
    setRemaining(52);
    setShuffle(shuffle + 1);
  };
  return (
    <>
      <button onClick={drawCard}> Add Card </button>
      <button onClick={newShuffle}> New Deck </button>
      <span> {remaining} cards remaining </span>

      <div className="Cards-list">
        {cardList.map((card) => (
          <Card key={card.id} img={card.image} />
        ))}
      </div>
    </>
  );
};

export default Cards;
