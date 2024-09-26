// components/SuggestedRecipes.js
import React from 'react';

const SuggestedRecipes = ({ recipes }) => {
  return (
    <div className="col-12">
      <h2 className="text-success">
        <i className="fas fa-book-open"></i> Suggested Recipes
      </h2>
      {recipes.length === 0 ? (
        <p className="text-muted">No recipes found. Please submit ingredients.</p>
      ) : (
        <div className="row">
          {recipes.map((recipe, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card recipe-card mb-4">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <i className="fas fa-carrot"></i> {recipe.title}
                  </h5>
                  <h6>Tags:</h6>
                  <p>{recipe.tags.join(', ')}</p>
                  <h6>Ingredients:</h6>
                  <ul>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle"></i> {ingredient}
                      </li>
                    ))}
                  </ul>
                  <h6>Instructions:</h6>
                  <ol>
                    {recipe.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedRecipes;
