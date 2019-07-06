import React from 'react';
import classes from '../../App.module.css';

const SearchResult = props => {
  return (
    <li>
      <a
        className={classes.results__link}
        href='#'
        id={`${props.id}`}
        onClick={() => props.onRecipeClick(props.id)}
      >
        <figure className={classes.results__fig}>
          <img src={props.imageURL} alt='Test' />
        </figure>
        <div className={classes.results__data}>
          <h4 className={classes.results__name}>{props.title}</h4>
          <p className={classes.results__author}>{props.publisher}</p>
        </div>
      </a>
    </li>
   
  );
};

export default SearchResult;

// results__link--active
