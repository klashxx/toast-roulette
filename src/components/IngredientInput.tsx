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
  const [isDefaultPressed, setIsDefaultPressed] = useState(false); // Track default button press

  const handleAddIngredient = () => {
    if (inputName.trim()) {
      setIngredients((prev) => [
        ...prev,
        { 
          name: inputName.trim(), 
          emoji: inputEmoji.trim() || '🍞' // Default to 🍞 if no emoji is provided
        },
      ]);
      setInputName('');
      setInputEmoji('');
      setIsDefaultPressed(false); // Reset the default button state if user adds custom ingredients
    }
  };

  const handleUseDefault = () => {
    setIngredients(defaultIngredients);
    setIsDefaultPressed(true); // Set default button as pressed
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
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button 
        onClick={handleUseDefault}
        className={isDefaultPressed ? "default-button pressed" : "default-button"}
      >
        Use Default Toppings
      </button>
    </div>
  );
};

export default IngredientInput;
