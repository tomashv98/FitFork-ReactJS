import React from 'react';
import classes from '../../App.module.css';

import checkIcon from '../../img/check.png';
import { formatQuantity } from '../../utils/utility';

const RecipeIngItem = ({ingredient})=> {
  return (
    <li className={classes.recipe__item}>
      <img src={checkIcon} className={classes.recipe__icon} alt='x' />
      <div className={classes.recipe__count}>
        {formatQuantity(ingredient.count)}
      </div>
      <div className={classes.recipe__ingredient}>
        <span className={classes.recipe__unit}>{ingredient.unit} </span>
        {ingredient.ingredient}
      </div>
    </li>
  );
};

export default RecipeIngItem;
