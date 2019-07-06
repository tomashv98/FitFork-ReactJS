import React from 'react';
import classes from '../App.module.css';
import glassIcon from '../img/glass.png';

class searchForm extends React.Component {
  state = {
    query: ' ',
  };
  clearInput() {
    this.setState({ query: ' ' });
  }
  onInputChange(e) {
    this.setState({ query: e.target.value });
  }
  render() {
    return (
      <form className={classes.search}>
        <input
          value={this.state.query}
          type='text'
          className={classes.search__field}
          placeholder='Search over 1,000,000 recipes...'
          onChange={e => this.onInputChange(e)}
        />
        <button
          className={classes.btn}
          onClick={e => {
            this.props.onQuerySubmit(e, this.state.query);
            this.clearInput();
          }}
        >
          <img className={classes.search__icon} src={glassIcon} alt="Search" />
          <span>Search</span>
        </button>
      </form>
    );
  }
}

export default searchForm;
