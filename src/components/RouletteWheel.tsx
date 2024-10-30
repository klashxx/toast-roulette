// src/components/RouletteWheel.tsx
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

interface RouletteWheelProps {
  ingredients: string[];
  spins: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ ingredients, spins }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const data = ingredients.map((ingredient) => ({ option: ingredient }));

  const handleSpinClick = () => {
    const indices = [];
    for (let i = 0; i < spins; i++) {
      indices.push(Math.floor(Math.random() * ingredients.length));
    }
    setSelectedIndices(indices);
    setPrizeNumber(indices[0]); // For animation purposes
    setMustSpin(true);
  };

  return (
    <div className="roulette-wheel">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => setMustSpin(false)}
        backgroundColors={['#FFEB3B', '#FFC107']}
        textColors={['#000']}
      />
      <button onClick={handleSpinClick}>Spin Roulette</button>
      {selectedIndices.length > 0 && (
        <div className="selected-ingredients">
          <h3>Your Ingredients:</h3>
          <ul>
            {selectedIndices.map((index, i) => (
              <li key={i}>{ingredients[index]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RouletteWheel;
