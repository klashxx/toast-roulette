import React, { useState, useEffect } from 'react';
import IngredientInput from './components/IngredientInput';
import RouletteWheel from './components/RouletteWheel';
import './App.css';

interface Ingredient {
  name: string;
  emoji: string;
}

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [spins, setSpins] = useState<number>(1);
  const [showRoulette, setShowRoulette] = useState<boolean>(false);

  // Function to reset the app to the initial state
  const handleReset = () => {
    setIngredients([]);       // Clear ingredients
    setSpins(1);               // Reset spins
    setShowRoulette(false);    // Go back to the initial input view
    console.log("Reset called. Ingredients:", ingredients, "Spins:", spins, "ShowRoulette:", showRoulette);
  };

  // Log the state on each render for debugging
  useEffect(() => {
    console.log("Ingredients:", ingredients, "Spins:", spins, "ShowRoulette:", showRoulette);
  }, [ingredients, spins, showRoulette]);

  return (
    <div className="app">
      <h1>🍞 Gazquez Toast Maker 🍞</h1>
      
      {/* Show the ingredient input and controls if roulette is not started */}
      {!showRoulette && (
        <>
          <IngredientInput setIngredients={setIngredients} />
          <div className="controls">
            <label htmlFor="spins">Ingredients on toast:</label>
            <input
              id="spins"
              type="number"
              value={spins}
              min={1}
              max={ingredients.length || 1}
              onChange={(e) => setSpins(Number(e.target.value))}
            />
            <button onClick={() => {
              if (ingredients.length > 1) {
                setShowRoulette(true);
              } else {
                console.log("No ingredients added. Cannot start roulette.");
                alert("Please add at least two ingredient to start the roulette.");
              }
            }}>Start Roulette</button>
          </div>
        </>
      )}

      {/* Show the roulette wheel if there are ingredients and showRoulette is true */}
      {showRoulette && ingredients.length > 0 && (
        <>
          <RouletteWheel ingredients={ingredients} spins={spins} />
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default App;
