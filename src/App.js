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
  };
  componentDidMount() {}
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
      console.log(recipe);
      if (recipe) {
        this.setState(prevState => {
          const selectedRecipe = {
            id,
            title: recipe.title,
            author: recipe.publisher,
            img: recipe.image_url,
            time: 45,
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
      console.log('Liked');
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
      console.log('Unliked');
    }
  }
  onAddToShoppingCart() {
    const recipeIngredientsArr = [...this.state.selectedRecipe.ingredients];
    const newList = [...this.state.shoppingList].concat(recipeIngredientsArr);
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
  render() {
    return (
      <div className={classes.container}>
        <Header
          onQuerySubmit={this.onQuerySubmit.bind(this)}
          likedRecipes={this.state.likedRecipes}
        />
        <SearchResults
          recipes={this.state.searchResults}
          error={this.state.error}
          loading={this.state.loading}
          onRecipeClick={id => this.onRecipeClick(id)}
        />
        <Recipe
          recipe={this.state.selectedRecipe}
          error={this.state.errorRecipe}
          loading={this.state.loadingRecipe}
          onLikeClick={id => this.onLikeRecipe(id)}
          onAddToShoppingCart={() => this.onAddToShoppingCart()}
          updateServings={type => this.updateServings(type)}
        />
        <ShoppingList
          shoppingList={this.state.shoppingList}
          onRemoveShoppingItem={ing => this.onRemoveShoppingItem(ing)}
          onQuantityChange={this.onShoppingItemQuantityChange.bind(this)}
        />
      </div>
    );
  }
}

export default App;
