import React from 'react';
import classes from '../../App.module.css';

import watchIcon from '../../img/stopwatch.png';
import plusIcon from '../../img/plus.png';
import minusIcon from '../../img/minus.png';
import personIcon from '../../img/person.png';
import likeIcon from '../../img/like.png';
import likedIcon from '../../img/liked.png';

const RecipeDetails = ({time, servings, updateServings, onLikeClick, isLiked})=> {
  return (
    <div className={classes.recipe__details}>
      <div className={classes.recipe__info}>
        <img
          className={classes.recipe__info_icon}
          src={watchIcon}
          alt='Watch'
        />
        <span className={classes.recipe__info_data}>{time}</span>
        <span> minutes</span>
      </div>
      <div className={classes.recipe__info}>
        <img
          className={classes.recipe__info_icon}
          src={personIcon}
          alt='Person(s)'
        />
        <span className={classes.recipe__info_data}>{servings}</span>
        <span> servings</span>

        <div className={classes.recipe__info_buttons}>
          <button
            className={classes.btn_tiny}
            onClick={() => updateServings('dec')}
          >
            <img src={minusIcon} alt='' />
          </button>
          <button
            className={classes.btn_tiny}
            onClick={() => updateServings('inc')}
          >
            <img src={plusIcon} alt='' />
          </button>
        </div>
      </div>
      <button className={classes.recipe__love} onClick={onLikeClick}>
        <img
          className={classes.likes__icon}
          src={isLiked ? likedIcon : likeIcon}
          alt='Like'
        />
      </button>
    </div>
  );
};

export default RecipeDetails;
