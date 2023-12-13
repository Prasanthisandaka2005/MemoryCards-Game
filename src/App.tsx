import React, { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

interface Card {
  src: string;
  matched: boolean;
  id: number;
}

const cardImages: Card[] = [
  { src: '../public/img/gem5.jpg', matched: false, id: Math.random() },
  { src: '../public/img/gem4.jpg', matched: false, id: Math.random() },
  { src: '../public/img/gem2.png', matched: false, id: Math.random() },
  { src: '../public/img/gem3.jpg', matched: false, id: Math.random() },
  { src: '../public/img/gem6.png', matched: false, id: Math.random() },
  { src: '../public/img/gem1.webp', matched: false, id: Math.random() }

];

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div>
      <div className='content-h'>
      <h1>Memory Cards Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className='card-wrapper'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          ></SingleCard>
        ))}</div>
      <p className='turns'>Turns : {turns}</p>
    </div>
  );
};

export default App;