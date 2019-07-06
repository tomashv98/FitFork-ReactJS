import React from 'react';
import classes from '../../App.module.css';

import RecipeIngItem from './RecipeIngItem';

const RecipeIngList = ({ ingredients }) => {
  return (
    <ul className={classes.recipe__ingredientlist}>
      {ingredients &&
        ingredients.map(ing => <RecipeIngItem ingredient={ing} key={ing.id} />)}
    </ul>
  );
};

export default RecipeIngList;
