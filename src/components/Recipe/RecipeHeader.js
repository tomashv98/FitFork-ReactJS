import React from 'react';
import classes from '../../App.module.css';


const RecipeHeader = ({imageURL, title})=> {
  return (
    <figure className={classes.recipe__fig}>
      <img
        src={imageURL}
        className={classes.recipe__img}
        alt={title}
      />
      <h1 className={classes.recipe__title}>
        <span>{title}</span>
      </h1>
    </figure>
  );
};

export default RecipeHeader;
