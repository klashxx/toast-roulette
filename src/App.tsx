// src/App.tsx
import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RouletteWheel from './components/RouletteWheel';
import './App.css';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [spins, setSpins] = useState<number>(1);

  return (
    <div className="app">
      <h1>Toast Ingredient Roulette</h1>
      <IngredientInput setIngredients={setIngredients} />
      <div className="controls">
        <label htmlFor="spins">Number of Ingredients:</label>
        <input
          id="spins"
          type="number"
          value={spins}
          min={1}
          max={ingredients.length || 1}
          onChange={(e) => setSpins(Number(e.target.value))}
        />
      </div>
      {ingredients.length > 0 && <RouletteWheel ingredients={ingredients} spins={spins} />}
    </div>
  );
};

export default App;
