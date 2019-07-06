import React from 'react';
import classes from '../../App.module.css';

import Button from './Button';

const PaginationsButtons = props => {
  return (
    <div className={classes.results__pages}>
      <Button btnType='prev' btnNo={1} />
      <Button btnType='next' btnNo={2} />
    </div>
  );
};

export default PaginationsButtons;
