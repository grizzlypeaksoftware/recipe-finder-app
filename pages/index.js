// pages/index.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'; // FontAwesome icons
import AddIngredients from '../components/AddIngredients';
import SuggestedRecipes from '../components/SuggestedRecipes';

const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setIsCollapsed(true); // Automatically collapse ingredients form when loading starts

    try {
      const response = await fetch('http://localhost:3042/api/suggest-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  useEffect(() => {
    // Collapse the ingredients form automatically when recipes are loaded
    if (recipes.length > 0) {
      setIsCollapsed(true);
    }
  }, [recipes]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center">
        <a className="navbar-brand text-center" href="#">
          <i className="fas fa-utensils mr-2"></i>
          Recipe Finder
        </a>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row">
          {/* Add Ingredients Component (Full Width) */}
          <div className="col-12">
            <AddIngredients 
              ingredients={ingredients} 
              setIngredients={setIngredients} 
              handleSubmit={handleSubmit} 
              loading={loading} // Pass loading state to disable form when loading
              isCollapsed={isCollapsed} // Pass collapse state to AddIngredients
            />
          </div>

          {/* Suggested Recipes Component (Full Width) */}
          <div className="col-12 mt-4">
            <SuggestedRecipes recipes={recipes} />
          </div>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </>
  );
};

export default Home;
