import React from 'react';
import classes from '../../App.module.css';
import LikedRecipe from './LikedRecipe';

const LikedRecipes =({likedRecipes, onRecipeClick}) => {
  return (
    <ul className={classes.likes__list}>
      {likedRecipes.length > 0 &&
        likedRecipes.map(recipe => (
          <LikedRecipe
            key={recipe.id}
            onRecipeClick={onRecipeClick}
            id={recipe.id}
            img={recipe.img}
            title={recipe.title}
            author={recipe.author}
          />
        ))}
    </ul>
  );
};

export default LikedRecipes;
