import React from 'react';
import classes from '../../App.module.css';

const SearchResult = ({
  id,
  imageURL,
  title,
  publisher,
  onRecipeClick,

}) => {
  return (
    <li>
      <a
        className={
           classes.results__link
        }
        href='#'
        id={`${id}`}
        onClick={() => onRecipeClick(id)}
      >
        <figure className={classes.results__fig}>
          <img src={imageURL} alt='Test' />
        </figure>
        <div className={classes.results__data}>
          <h4 className={classes.results__name}>{title}</h4>
          <p className={classes.results__author}>{publisher}</p>
        </div>
      </a>
    </li>
  );
};

export default SearchResult;

// results__link--active
