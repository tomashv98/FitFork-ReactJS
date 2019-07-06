import React from 'react';
import classes from '../../App.module.css';

import directionIcon from '../../img/next.png';

const RecipeDirections = ({ author, source }) => {
  return (
    <div className={classes.recipe__directions}>
      <h2 className={classes.heading_2}>How to cook it</h2>
      <p className={classes.recipe__directions_text}>
        This recipe was carefully designed and tested by
        <span className={classes.recipe__by}> {author}</span>. Please check out
        directions at their website.
      </p>
      <a className={classes.btn_small} href={source}>
        <span>Directions</span>
        <img src={directionIcon} alt='' className={classes.search__icon} />
      </a>
    </div>
  );
};

export default RecipeDirections;
