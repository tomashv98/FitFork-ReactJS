import React from 'react';

import classes from './App.module.css';

import Header from './components/Header';
import SearchResults from './components/SearchResults/SearchResults';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Recipe from './components/Recipe/Recipe';
import { updateObject, fetchRecipes, fetchSingleRecipe } from './utils/utility';

class App extends React.Component {
  state = {
    searchResults: [],
    loading: false,
    error: null,
    selectedRecipe: null,
    loadingRecipe: false,
    errorRecipe: null,
    likedRecipes: [],
    shoppingList: [],
    currentPage: 1,
  };
  async onQuerySubmit(e, query) {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const recipes = await fetchRecipes(query);
      if (recipes) {
        this.setState(prevState => {
          return updateObject(prevState, {
            loading: false,
            searchResults: recipes,
            error: null,
          });
        });
      } else {
        this.setState(prevState => {
          return updateObject(prevState, {
            loading: false,
            error: 'No recipe found',
            searchResults: [],
          });
        });
      }
    } catch (e) {
      console.log('Something went wrong', e);
    }
  }
  async onRecipeClick(id) {
    this.setState(prevState => {
      return updateObject(prevState, {
        errorRecipe: null,
        loadingRecipe: true,
        selectedRecipe: null,
      });
    });
    try {
      const recipe = await fetchSingleRecipe(id);
      if (recipe) {
        this.setState(prevState => {
          const selectedRecipe = {
            id,
            title: recipe.title,
            author: recipe.publisher,
            img: recipe.image_url,
            time: recipe.time,
            servings: 4,
            ingredients: recipe.ingredients,
            liked: false,
            url: recipe.source_url,
          };
          return updateObject(prevState, {
            selectedRecipe,
            loadingRecipe: false,
            errorRecipe: null,
          });
        });
      } else {
        this.setState(prevState => {
          return updateObject(prevState, {
            errorRecipe: 'Can not load recipe',
            loadingRecipe: false,
            selectedRecipe: null,
          });
        });
      }
    } catch (e) {
      console.log('Something went wrong', e);
    }
  }
  onLikeRecipe() {
    const selectedRecipe = { ...this.state.selectedRecipe };
    const likedRecipeArr = [...this.state.likedRecipes];
    const recipeIndex = likedRecipeArr.findIndex(
      recipe => recipe.id === selectedRecipe.id,
    );
    if (recipeIndex === -1) {
      this.setState(prevState => {
        const newArr = likedRecipeArr.concat(selectedRecipe);
        const recipeLiked = updateObject(selectedRecipe, { liked: true });
        return updateObject(prevState, {
          likedRecipes: newArr,
          selectedRecipe: recipeLiked,
        });
      });
    } else {
      this.setState(prevState => {
        const newArr = likedRecipeArr.filter(
          recipe => recipe.id !== selectedRecipe.id,
        );
        const recipeUnliked = updateObject(selectedRecipe, { liked: false });
        return updateObject(prevState, {
          likedRecipes: newArr,
          selectedRecipe: recipeUnliked,
        });
      });
    }
  }
  onAddToShoppingCart() {
    const newList = [...this.state.shoppingList].concat([
      ...this.state.selectedRecipe.ingredients,
    ]);
    this.setState({ shoppingList: newList });
  }
  onRemoveShoppingItem(id) {
    this.setState(prevState => {
      const newArr = [...this.state.shoppingList].filter(
        ingredient => ingredient.id !== id,
      );
      return updateObject(prevState, { shoppingList: newArr });
    });
  }
  onShoppingItemQuantityChange(e, id) {
    const input = e.target.value;
    this.setState(prevState => {
      const index = prevState.shoppingList.findIndex(
        ingredient => ingredient.id === id,
      );
      const changedIng = { ...prevState.shoppingList[index] };
      changedIng.count = input;
      const newList = [...prevState.shoppingList];
      newList[index] = changedIng;
      return updateObject(prevState, { shoppingList: newList });
    });
  }
  updateServings(type) {
    if (this.state.selectedRecipe.servings > 1) {
      return this.setState(prevState => {
        let newServings = null;
        if (type === 'inc') {
          newServings = prevState.selectedRecipe.servings + 1;
        } else if (type === 'dec') {
          newServings = prevState.selectedRecipe.servings - 1;
        }
        const newIngsArray = prevState.selectedRecipe.ingredients.map(ing => {
          const newCount =
            ing.count * (newServings / prevState.selectedRecipe.servings);
          return updateObject(ing, { count: newCount });
        });
        const updatedRecipe = { ...prevState.selectedRecipe };
        updatedRecipe.servings = newServings;
        updatedRecipe.ingredients = newIngsArray;
        return updateObject(prevState, { selectedRecipe: updatedRecipe });
      });
    }
    console.log('Nothing happened');
  }
  paginate(type) {
    let newPageNum = null;
    if (type === 'prev') {
      newPageNum = this.state.currentPage - 1;
    } else if (type === 'next') {
      newPageNum = this.state.currentPage + 1;
    }
    this.setState({ currentPage: newPageNum });
  }
  render() {
    const itemsPerPage = 10;
    const indexOfLastResult = this.state.currentPage * itemsPerPage;
    const indexOfFirstResult = indexOfLastResult - itemsPerPage;
    const currentResults = this.state.searchResults.slice(
      indexOfFirstResult,
      indexOfLastResult,
    );
    const pages = Math.ceil(this.state.searchResults.length / itemsPerPage);

    return (
      <div className={classes.container}>
        <Header
          onQuerySubmit={this.onQuerySubmit.bind(this)}
          likedRecipes={this.state.likedRecipes}
          // onRecipeClick={id => this.onRecipeClick(id)}
           onRecipeClick={this.onRecipeClick.bind(this)}
        />
        <SearchResults
          recipes={currentResults}
          error={this.state.error}
          loading={this.state.loading}
          onRecipeClick={this.onRecipeClick.bind(this)}
          postsPerPage={itemsPerPage}
          totalPosts={this.state.searchResults.length}
          paginate={this.paginate.bind(this)}
          pages={pages}
          currentPage={this.state.currentPage}
        />
        <Recipe
          recipe={this.state.selectedRecipe}
          error={this.state.errorRecipe}
          loading={this.state.loadingRecipe}
          onLikeClick={this.onLikeRecipe.bind(this)}
          onAddToShoppingCart={this.onAddToShoppingCart.bind(this)}
          updateServings={this.updateServings.bind(this)}
        />
        <ShoppingList
          shoppingList={this.state.shoppingList}
          onRemoveShoppingItem={this.onRemoveShoppingItem.bind(this)}
          onQuantityChange={this.onShoppingItemQuantityChange.bind(this)}
        />
      </div>
    );
  }
}

export default App;
