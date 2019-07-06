import React from 'react';
import classes from '../../App.module.css';


const RecipeHeader = props => {
  return (
    <figure className={classes.recipe__fig}>
      <img
        src={props.imageURL}
        className={classes.recipe__img}
        alt={props.title}
      />
      <h1 className={classes.recipe__title}>
        <span>{props.title}</span>
      </h1>
    </figure>
  );
};

export default RecipeHeader;
