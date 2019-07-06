import React from 'react';
import classes from '../../App.module.css';

import ShoppingItem from './ShoppingItem';
import Copyright from '../Copyright';

const ShoppingList = ({shoppingList, onRemoveShoppingItem, onQuantityChange}) => {
  return (
    <div className={classes.shopping}>
      <h2 className={classes.heading__2}>My Shopping List</h2>
      {shoppingList.length > 0 ? (
        <ul className={classes.shopping__list}>
          {shoppingList.length > 0
            ? shoppingList.map((ingredient, i) => (
                <ShoppingItem
                  key={ingredient.ingredient.id}
                  ingredient={ingredient}
                  onRemoveShoppingItem={onRemoveShoppingItem}
                  onQuantityChange={onQuantityChange}

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
