import React from 'react';
import classes from '../../App.module.css';


const LikedRecipe = ({img, onRecipeClick, id, title, author})=> {
  return (
    <li>
    <a className={classes.likes__link} href='#' onClick={()=>onRecipeClick(id)}>
      <figure className={classes.likes__fig}>
        <img src={img} alt='Test' />
      </figure>
      <div className={classes.likes__data}>
        <h4 className={classes.likes__name}>{title}</h4>
        <p className={classes.likes__author}>{author}</p>
      </div>
    </a>
  </li>
  )
}

export default LikedRecipe