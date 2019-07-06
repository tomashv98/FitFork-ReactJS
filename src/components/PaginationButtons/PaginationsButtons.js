import React from 'react';
import classes from '../../App.module.css';

import Button from './Button';
import Aux from '../../Aux';

const PaginationsButtons = props => {
  return (
    <div className={classes.results__pages}>
      {props.currentPage === 1 && <Button paginate={props.paginate} btnType='next' />}
      {props.currentPage === 2 && (
        <Aux>
          <Button paginate={props.paginate} btnType='prev' />
          <Button paginate={props.paginate} btnType='next' />
        </Aux>
      )}
      {props.currentPage === 3 && <Button paginate={props.paginate} btnType='prev' />}}
    </div>
  );
};

export default PaginationsButtons;
// <Button paginate={props.paginate} btnType='next' btnNo={2} />
