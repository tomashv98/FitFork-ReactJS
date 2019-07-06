import React from 'react';
import classes from '../../App.module.css';


const LikedRecipe = props => {
  return (
    <li>
    <a className={classes.likes__link} href='#23456'>
      <figure className={classes.likes__fig}>
        <img src={props.img} alt='Test' />
      </figure>
      <div className={classes.likes__data}>
        <h4 className={classes.likes__name}>{props.title}</h4>
        <p className={classes.likes__author}>{props.author}</p>
      </div>
    </a>
  </li>
  )
}

export default LikedRecipe