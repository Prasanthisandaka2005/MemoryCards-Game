import React, { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import { Images } from './constants/Images';
import Modal from 'react-modal';

interface Card {
  src: string;
  matched: boolean;
  id: number;
}

const cardImages: Card[] = [
  { src: Images.gem5, matched: false, id: Math.random() },
  { src: Images.gem4, matched: false, id: Math.random() },
  { src: Images.gem2, matched: false, id: Math.random() },
  { src: Images.gem3, matched: false, id: Math.random() },
  { src: Images.gem6, matched: false, id: Math.random() },
  { src: Images.gem1, matched: false, id: Math.random() }
];

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<string>("");

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !gameOver) {
      setGameOver(true);
      setGameResult("lost");
    }
  }, [timer, gameOver]);

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

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
      setGameResult("won");
    }
  }, [cards]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setTimer(40);
    setGameOver(false);
    setGameResult("");
  };

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div>
      <div className='content-h'>
      <h1>Memory Cards Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p className='timer'>Time Left: {timer}s</p>
      </div>
      <div className='card-wrapper'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className='turns'>Turns: {turns}</p>
      <Modal
        isOpen={gameOver}
        contentLabel="Game Result"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>You {gameResult}!</h2>
        {gameResult == "won" &&(
        <h2>Your Score {turns}</h2>)}
        <button onClick={shuffleCards}>Play Again</button>
      </Modal>
    </div>
  );
};

export default App;
