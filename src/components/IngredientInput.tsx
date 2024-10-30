// src/components/IngredientInput.tsx
import React, { useState } from 'react';

interface IngredientInputProps {
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultIngredients = [
  'Tomato',
  'Avocado',
  'Butter',
  'Spanish Jam',
  'Tuna',
  'Cheese',
  'Garlic Spicy Sauce',
  'Spanish Omelette',
  'Sobrasada',
];

const IngredientInput: React.FC<IngredientInputProps> = ({ setIngredients }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      setIngredients((prev) => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleUseDefault = () => {
    setIngredients(defaultIngredients);
  };

  return (
    <div className="ingredient-input">
      <h2>Choose Your Ingredients</h2>
      <input
        type="text"
        value={inputValue}
        placeholder="Add an ingredient"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleUseDefault}>Use Default Ingredients</button>
    </div>
  );
};

export default IngredientInput;
