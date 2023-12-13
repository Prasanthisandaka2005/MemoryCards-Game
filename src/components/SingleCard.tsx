import './SingleCard.css'

interface SingleCardProps {
  card: {
    src: string;
    matched: boolean;
    id: number;
  };
  handleChoice: (card: { src: string; matched: boolean; id: number }) => void;
  flipped: boolean;
  disabled: boolean;
}

export default function SingleCard({ card, handleChoice, flipped, disabled }: SingleCardProps) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} className='front' alt='card front' />
        <img src='../public/img/coverImg.jpg' className='back' onClick={handleClick} alt='card back' />
      </div>
    </div>
  );
}