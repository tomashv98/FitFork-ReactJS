import React from 'react';
import classes from '../../App.module.css';

import Button from './Button';
import Aux from '../../Aux';

const PaginationsButtons =({paginate, currentPage}) => {
  return (
    <div className={classes.results__pages}>
      {currentPage === 1 && <Button paginate={paginate} btnType='next' />}
      {currentPage === 2 && (
        <Aux>
          <Button paginate={paginate} btnType='prev' />
          <Button paginate={paginate} btnType='next' />
        </Aux>
      )}
      {currentPage === 3 && <Button paginate={paginate} btnType='prev' />}
    </div>
  );
};

export default PaginationsButtons;
// <Button paginate={paginate} btnType='next' btnNo={2} />
