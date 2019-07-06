import React from 'react';
import classes from '../../App.module.css';

import watchIcon from '../../img/stopwatch.png';
import plusIcon from '../../img/plus.png';
import minusIcon from '../../img/minus.png';
import personIcon from '../../img/person.png';
import likeIcon from '../../img/like.png';
import likedIcon from '../../img/liked.png';

const RecipeDetails = props => {
  return (
    <div className={classes.recipe__details}>
      <div className={classes.recipe__info}>
        <img
          className={classes.recipe__info_icon}
          src={watchIcon}
          alt='Watch'
        />
        <span className={classes.recipe__info_data}>{props.time}</span>
        <span> minutes</span>
      </div>
      <div className={classes.recipe__info}>
        <img
          className={classes.recipe__info_icon}
          src={personIcon}
          alt='Person(s)'
        />
        <span className={classes.recipe__info_data}>{props.servings}</span>
        <span> servings</span>

        <div className={classes.recipe__info_buttons}>
          <button
            className={classes.btn_tiny}
            onClick={() => props.updateServings('dec')}
          >
            <img src={minusIcon} alt='' />
          </button>
          <button
            className={classes.btn_tiny}
            onClick={() => props.updateServings('inc')}
          >
            <img src={plusIcon} alt='' />
          </button>
        </div>
      </div>
      <button className={classes.recipe__love} onClick={props.onLikeClick}>
        <img
          className={classes.likes__icon}
          src={props.isLiked ? likedIcon : likeIcon}
          alt='Like'
        />
      </button>
    </div>
  );
};

export default RecipeDetails;
