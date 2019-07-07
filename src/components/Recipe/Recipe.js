import React from 'react';
import classes from '../../App.module.css';

import cartIcon from '../../img/shopping-cart.png';

import RecipeHeader from './RecipeHeader';
import RecipeDetails from './RecipeDetails';
import RecipeIngList from './RecipeIngList';
import RecipeDirections from './RecipeDirections';
import Spinner from '../Spinner/Spinner';
import Aux from '../../Aux';

const Recipe =({loading, recipe, error, onLikeClick, onAddToShoppingCart, updateServings}) => {
  return (
    <div className={classes.recipe}>
      {loading ? <Spinner /> : null}
      {recipe && !loading && !error ? (
        <Aux>
          <RecipeHeader
            imageURL={recipe.img}
            title={recipe.title}
          />
          <RecipeDetails
            servings={recipe.servings}
            time={recipe.time}
            onLikeClick={onLikeClick}
            isLiked={recipe.liked}
            updateServings={updateServings}
          />
          <div className={classes.recipe__ingredients}>
            <RecipeIngList ingredients={recipe.ingredients} />
            <button
              className={classes.btn_small}
              onClick={onAddToShoppingCart}
            >
              <img src={cartIcon} className={classes.search__icon} alt='Cart' />
              <span>Add to shopping list</span>
            </button>
          </div>
          <RecipeDirections
            source={recipe.url}
            author={recipe.author}
          />
        </Aux>
      ) : (
       
          <p className={classes.error__message}>{error}</p>
        
      )}
    </div>
  );
};

export default Recipe;
