import React from 'react';
import classes from '../../App.module.css';

import ShoppingItem from './ShoppingItem';
import Copyright from '../Copyright';

const ShoppingList = props => {
  return (
    <div className={classes.shopping}>
      <h2 className={classes.heading__2}>My Shopping List</h2>
      {props.shoppingList.length > 0 ? (
        <ul className={classes.shopping__list}>
          {props.shoppingList.length > 0
            ? props.shoppingList.map((ingredient, i) => (
                <ShoppingItem
                  key={ingredient.ingredient.id}
                  ingredient={ingredient}
                  onRemoveShoppingItem={props.onRemoveShoppingItem}
                  onQuantityChange={props.onQuantityChange}

                />
              ))
            : null}
        </ul>
      ) : null}

      <Copyright />
    </div>
  );
};

export default ShoppingList;
