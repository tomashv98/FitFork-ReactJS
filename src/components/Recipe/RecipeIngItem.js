import React from 'react';
import classes from '../../App.module.css';

import checkIcon from '../../img/check.png';
import { formatQuantity } from '../../utils/utility';

const RecipeIngItem = props => {
  return (
    <li className={classes.recipe__item}>
      <img src={checkIcon} className={classes.recipe__icon} alt='x' />
      <div className={classes.recipe__count}>
        {formatQuantity(props.ingredient.count)}
      </div>
      <div className={classes.recipe__ingredient}>
        <span className={classes.recipe__unit}>{props.ingredient.unit} </span>
        {props.ingredient.ingredient}
      </div>
    </li>
  );
};

export default RecipeIngItem;
