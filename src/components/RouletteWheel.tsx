import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

interface Ingredient {
  name: string;
  emoji: string;
}

interface RouletteWheelProps {
  ingredients: Ingredient[];
  spins: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ ingredients, spins }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [finalIngredients, setFinalIngredients] = useState<Ingredient[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState(
    ingredients.map((ingredient) => ({
      option: `${ingredient.emoji} ${ingredient.name}`,
      ingredient,
    }))
  );

  useEffect(() => {
    setAvailableIngredients(
      ingredients.map((ingredient) => ({
        option: `${ingredient.emoji} ${ingredient.name}`,
        ingredient,
      }))
    );
  }, [ingredients]);

  const handleSpinClick = () => {
    if (spinCount < spins && availableIngredients.length > 0) {
      const index = Math.floor(Math.random() * availableIngredients.length);
      setPrizeNumber(index);
      setMustSpin(true);
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const selectedItem = availableIngredients[prizeNumber];
    setFinalIngredients((prev) => [...prev, selectedItem.ingredient]);
    setSpinCount((prev) => prev + 1);

    const newAvailable = [...availableIngredients];
    newAvailable.splice(prizeNumber, 1);
    setAvailableIngredients(newAvailable);

    if (spinCount + 1 < spins && newAvailable.length > 0) {
      setTimeout(() => {
        handleSpinClick();
      }, 1000);
    }
  };

  return (
    <div className="roulette-wheel">
      {ingredients.length < 2 ? (
        <div className="error-message">
          <p>Please add at least two ingredients to use the roulette.</p>
        </div>
      ) : (
        <>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={availableIngredients}
            onStopSpinning={handleStopSpinning}
            backgroundColors={['#FFEB3B', '#FFC107']}
            textColors={['#000']}
          />
          {!mustSpin && spinCount === 0 && (
            <button onClick={handleSpinClick}>Spin Roulette</button>
          )}
          {finalIngredients.length > 0 && spinCount === spins && (
            <div className="selected-ingredients">
              <h3>Your Ingredients:</h3>
              <ul>
                {finalIngredients.map((ingredient, i) => (
                  <li key={i}>
                    {ingredient.emoji} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RouletteWheel;
