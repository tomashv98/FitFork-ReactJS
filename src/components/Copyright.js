import React from 'react';
import classes from '../App.module.css';

const Copyright = props =>{
  return(
    <div className={classes.copyright}>
          &copy; by Jonas Schmedtmann. Converted to React by Quan Vu Powered by
          <a href='http://food2fork.com' className={classes.link}>
            Food2Fork.com
          </a>
          .
        </div>
  )
}

export default Copyright