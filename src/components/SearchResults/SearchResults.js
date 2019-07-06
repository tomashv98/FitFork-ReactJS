import React from 'react';
import classes from '../../App.module.css';

import SearchResult from './SearchResult';
import PaginationButtons from '../PaginationButtons/PaginationsButtons';
import Spinner from '../Spinner/Spinner';
import Aux from '../../Aux';
import { limitTitle } from '../../utils/utility';

const SearchResults = ({loading, error, recipes, onRecipeClick, paginate, pages, currentPage, active})=> {
  return (
    <div className={classes.results}>
      {loading ? <Spinner /> : null}
      {!loading && !error && recipes ? (
        <Aux>
          <ul className={classes.results__list}>
            {recipes.map(({recipe_id, publisher, image_url, title})=> (
              <SearchResult
                onRecipeClick={onRecipeClick}
                id={recipe_id}
                publisher={publisher}
                imageURL={image_url}
                title={limitTitle(title)}
                key={recipe_id}
              />
            ))}
          </ul>
          {recipes.length >= 10 && (
            <PaginationButtons
              paginate={paginate}
              pages={pages}
              currentPage={currentPage}
            />
          )}
        </Aux>
      ) : (
        <div>
          <p>{error}</p>
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
