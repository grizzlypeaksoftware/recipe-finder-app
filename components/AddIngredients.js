// components/AddIngredients.js
import React, { useState } from 'react';

const AddIngredients = ({ ingredients, setIngredients, handleSubmit, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue(''); // Clear input after adding
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="text-primary">
          <i className="fas fa-lemon"></i> Add Ingredients
        </h2>
        <button className="btn btn-outline-secondary" onClick={toggleCollapse}>
          {isCollapsed ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
          {isCollapsed ? ' Expand' : ' Collapse'}
        </button>
      </div>

      {!isCollapsed && (
        <div className={`ingredients-form ${loading ? 'disabled' : ''}`}>
          <form onSubmit={handleAddIngredient} className="d-flex flex-column flex-md-row align-items-md-center">
            <div className="form-group mb-2 mb-md-0 flex-grow-1 mr-md-2">
              <input
                type="text"
                className="form-control"
                id="ingredientsInput"
                placeholder="Enter ingredient"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2 mb-md-0" disabled={loading}>
              <i className="fas fa-plus-circle"></i> Add Ingredient
            </button>
          </form>

          <h6 className="mt-3">Ingredients List:</h6>
          {ingredients.length === 0 ? (
            <p className="text-muted">No ingredients added yet. Please add some ingredients.</p>
          ) : (
            <ul className="list-group mt-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {ingredient}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveIngredient(ingredient)}
                  >
                    <i className="fas fa-trash-alt"></i> Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Submit Recipe Button */}
          <button className="btn btn-success mt-3" onClick={handleSubmit} disabled={loading}>
            {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-utensils"></i>}
            {loading ? ' Loading...' : ' Submit Recipe'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddIngredients;
