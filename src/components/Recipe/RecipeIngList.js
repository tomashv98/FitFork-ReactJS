import React from 'react';
import classes from '../../App.module.css';

import RecipeIngItem from './RecipeIngItem';

const RecipeIngList = props => {
  return (
    <ul className={classes.recipe__ingredientlist}>
      {props.ingredients &&
        props.ingredients.map((ing, i) => (
          <RecipeIngItem ingredient={ing} key={ing.id} />
        ))}
    </ul>
  );
};

export default RecipeIngList;
