import React from 'react';
import classes from '../../App.module.css';

import cartIcon from '../../img/shopping-cart.png';

import RecipeHeader from './RecipeHeader';
import RecipeDetails from './RecipeDetails';
import RecipeIngList from './RecipeIngList';
import RecipeDirections from './RecipeDirections';
import Spinner from '../Spinner/Spinner';
import Aux from '../../Aux';

const Recipe = props => {
  return (
    <div className={classes.recipe}>
      {props.loading ? <Spinner /> : null}
      {props.recipe && !props.loading && !props.error ? (
        <Aux>
          <RecipeHeader
            imageURL={props.recipe.img}
            title={props.recipe.title}
          />
          <RecipeDetails
            servings={props.recipe.servings}
            time={props.recipe.time}
            onLikeClick={props.onLikeClick}
            isLiked={props.recipe.liked}
            updateServings={props.updateServings}
          />
          <div className={classes.recipe__ingredients}>
            <RecipeIngList ingredients={props.recipe.ingredients} />
            <button
              className={classes.btn_small}
              onClick={props.onAddToShoppingCart}
            >
              <img src={cartIcon} className={classes.search__icon} alt='Cart' />
              <span>Add to shopping list</span>
            </button>
          </div>
          <RecipeDirections
            source={props.recipe.url}
            author={props.recipe.author}
          />
        </Aux>
      ) : (
        <div>
          <p>{props.error}</p>
        </div>
      )}
    </div>
  );
};

export default Recipe;
