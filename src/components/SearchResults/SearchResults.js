import React from 'react';
import classes from '../../App.module.css';

import SearchResult from './SearchResult';
import PaginationButtons from '../PaginationButtons/PaginationsButtons';
import Spinner from '../Spinner/Spinner';

import { limitTitle } from '../../utils/utility';

const SearchResults = props => {
  return (
    <div className={classes.results}>
      {props.loading ? <Spinner /> : null}
      {!props.loading && !props.error && props.recipes ? (
        <ul className={classes.results__list}>
          {props.recipes.map(recipe => (
            <SearchResult
            onRecipeClick={props.onRecipeClick}
              id={recipe.recipe_id}
              publisher={recipe.publisher}
              imageURL={recipe.image_url}
              title={limitTitle(recipe.title)}
              key={recipe.recipe_id}
            />
          ))}
        </ul>
      ) : (
        <div>
          <p>{props.error}</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

/* 
let renderedResults = null;
    if (this.state.loading) {
      renderedResults = <Spinner />;
    } else if (!this.state.loading && this.state.error) {
      renderedResults = <div>{this.state.error}</div>;
    } else if (
      !this.state.loading &&
      !this.state.error &&
      this.state.searchResults.length > 0
    ) {
      renderedResults = (
        <SearchResults
          recipes={this.state.searchResults}
          error={this.state.error}
          loading={this.state.loading}
        />
      );
    }


*/
