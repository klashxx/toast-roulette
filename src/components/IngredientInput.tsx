// src/components/IngredientInput.tsx
import React, { useState } from 'react';

interface Ingredient {
  name: string;
  emoji: string;
}

interface IngredientInputProps {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const defaultIngredients: Ingredient[] = [
  { name: 'Avocado', emoji: '🥑' },
  { name: 'Ham', emoji: '🥩' },
  { name: 'Tuna', emoji: '🐟' },
  { name: 'Cheese', emoji: '🧀' },
  { name: 'Garlic Spicy', emoji: '🌶️' },
  { name: 'Omelette', emoji: '🥘' },
  { name: 'Sobrasada', emoji: '🍖' },
  { name: 'Jam', emoji: '🥫' },
];

const IngredientInput: React.FC<IngredientInputProps> = ({ setIngredients }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmoji, setInputEmoji] = useState('');

  const handleAddIngredient = () => {
    if (inputName.trim()) {
      setIngredients((prev) => [
        ...prev,
        { 
          name: inputName.trim(), 
          emoji: inputEmoji.trim() || '🍞'
        },
      ]);
      setInputName('');
      setInputEmoji('');
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
        value={inputEmoji}
        placeholder="Emoji"
        onChange={(e) => setInputEmoji(e.target.value)}
      />
      <input
        type="text"
        value={inputName}
        placeholder="Add an ingredient"
        onChange={(e) => setInputName(e.target.value)}
      />
      <button onClick={handleAddIngredient}>Add Toping</button>
      <button onClick={handleUseDefault}>Use Default Topings</button>
    </div>
  );
};

export default IngredientInput;
