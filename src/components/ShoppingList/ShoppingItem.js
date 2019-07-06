import React from 'react';
import classes from '../../App.module.css';
// import { formatQuantity } from '../../utils/utility';

import deleteIcon from '../../img/delete.png';

const ShoppingItem = ({ingredient, onQuantityChange, onRemoveShoppingItem}) => {
  return (
    <li className={classes.shopping__item}>
      <div className={classes.shopping__count}>
        <input
        min={0}
          type='number'
          value={ingredient.count}
          step={ingredient.count}
          onChange={e => {
            onQuantityChange(e, ingredient.id);
          }}
        />
        <p>{ingredient.unit}</p>
      </div>
      <p className={classes.shopping__description}>{ingredient.ingredient}</p>
      <button
        className={classes.shopping__delete}
        onClick={() => onRemoveShoppingItem(ingredient.id)}
      >
        <img src={deleteIcon} alt='' />
      </button>
    </li>
  );
};

export default ShoppingItem;
