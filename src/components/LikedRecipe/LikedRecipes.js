import React from 'react';
import classes from '../../App.module.css';
import LikedRecipe from './LikedRecipe';

const LikedRecipes = props => {
  return (
    <ul className={classes.likes__list}>
      {props.likedRecipes.length > 0
        ? props.likedRecipes.map(recipe => (
            <LikedRecipe
              key={recipe.id}
              img={recipe.img}
              title={recipe.title}
              author={recipe.author}
            />
          ))
        : 'No liked recipe'}
    </ul>
  );
};

export default LikedRecipes;
