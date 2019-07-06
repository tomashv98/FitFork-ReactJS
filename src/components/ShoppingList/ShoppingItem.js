import React from 'react';
import classes from '../../App.module.css';
// import { formatQuantity } from '../../utils/utility';

import deleteIcon from '../../img/delete.png';

const ShoppingItem = props => {
  return (
    <li className={classes.shopping__item}>
      <div className={classes.shopping__count}>
        <input
        min={0}
          type='number'
          value={props.ingredient.count}
          step={props.ingredient.count}
          onChange={e => {
            props.onQuantityChange(e, props.ingredient.id);
          }}
        />
        <p>{props.ingredient.unit}</p>
      </div>
      <p className={classes.shopping__description}>{props.ingredient.ingredient}</p>
      <button
        className={classes.shopping__delete}
        onClick={() => props.onRemoveShoppingItem(props.ingredient.id)}
      >
        <img src={deleteIcon} alt='' />
      </button>
    </li>
  );
};

export default ShoppingItem;
