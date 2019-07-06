import axios from '../axios-order';
import Fraction from 'fraction.js';
import uuid from 'uuid/v4';

// Ingredient manipulation functions
export const formatQuantity = quantity => {
  if (quantity) {
    const num = new Fraction(quantity).simplify(0.00001);
    return num.toFraction(true);
  }
  return '?';
};

// To evaluate strings
export const fractToDecimal = fractVal => {
  let x, y;
  if (Array.isArray(fractVal)) {
    x = fractVal;
  } else if (fractVal.includes('-') || fractVal.includes('/')) {
    x = fractVal.includes('-') ? fractVal.split('-') : fractVal.split(' ');
  } else {
    return parseInt(fractVal);
  }

  if (x.length > 1 && !x[0].includes('/')) {
    y = x[1].split('/');
    const numY = y[0] / y[1];
    const numX = parseInt(x[0]);

    return numX + numY;
  } else {
    y = x[0].split('/');

    return y[0] / y[1];
  }
};

//Ingredients manipulation

export const getUnique = (arr, comp) => {
  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
};

export const parseIngredients = ingredientsArr => {
  // 5 cups of garlic powder
  const unitLong = [
    'tablespoons',
    'tablespoon',
    'ounces',
    'ounce',
    'teaspoons',
    'teaspoon',
    'cups',
    'cup',
    'pounds',
    'pound',
  ];
  const unitShort = [
    'tbsp',
    'tbsp',
    'oz',
    'oz',
    'tsp',
    'tsp',
    'cup',
    'cup',
    'pound',
    'pound',
  ];
  const units = [...unitShort, 'kg', 'g'];
  // el represent single ingredient in each iteration
  // map() returns array of results
  const newIngredientsArr = ingredientsArr.map(el => {
    // Uniform units
    let ingredient = el.toLowerCase();
    // Change long to short

    unitLong.forEach((unit, i) => {
      // Replace will find the exact element equals to [i] to replace it with [i]
      // 1st loop tablespoons => tbsp (cant find tablespoons, nothing happens)
      ingredient = ingredient.replace(unit, unitShort[i]);
    });

    // Remove parentheses
    ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
    // Parse ingredients into count, unit and ingredient
    // [4, 1/2 , "cups", "of", "onion"]
    const arrIng = ingredient.split(' ');
    // findindex(condition), returns index of the first element that satisfies condition
    // unitIndex returns 2
    const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
    let objIng;

    if (unitIndex > -1) {
      // There is an unit of measurement
      // arrIng.slice(0,2)returns [4, 1/2]
      const arrCount = arrIng.slice(0, unitIndex);
      let count;

      if (arrCount.length === 1) {
        // if the count was only one number then count is the first element of array
        count = fractToDecimal(arrIng[0].replace('-', ' '));
      } else {
        // eval() calculates and returns 4,5

        count = fractToDecimal(arrIng.slice(0, unitIndex).join(' '));
      }

      // count without value assigned => count
      objIng = {
        id: uuid(),
        count,
        unit: arrIng[unitIndex],
        // ingredient starts after unit "of onions"
        ingredient: arrIng.slice(unitIndex + 1).join(' '),
      };
      // if first element can be converted to a number
    } else if (parseInt(arrIng[0], 10)) {
      // No unit but 1st elemet is a number
      objIng = {
        // 2 onions => count = 2
        id: uuid(),

        count: parseInt(arrIng[0], 10),
        unit: '',
        ingredient: arrIng.slice(1).join(' '),
      };
    } else if (unitIndex === -1) {
      // There is no unit and no number in 1st position

      objIng = {
        id: uuid(),
        count: 1,
        unit: '',
        ingredient,
      };
    }
    return objIng;
  });
  const uniqueArr = getUnique(newIngredientsArr, 'ingredient');
  return uniqueArr;
};

export const updateObject = (oldObj, updatedVals) => {
  return {
    ...oldObj,
    ...updatedVals,
  };
};

export const limitTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

// Fetching funtions

export const fetchRecipes = async query => {
  const { data } = await axios(
    `/search?key=${process.env.REACT_APP_RECIPES_API_KEY}&q=${query}`,
  );
  if (data.count > 0) {
    //console.log('Fetch successfull, recipe count: ', data);
    return data.recipes;
  } else {
    //console.log('Fetch unsuccessfull :(', data);
    return null;
  }
};

export const fetchSingleRecipe = async id => {
  const { data } = await axios(
    `/get?key=${process.env.REACT_APP_RECIPES_API_KEY}&rId=${id}`,
  );

  if (data.recipe.title) {
   // console.log('original', data.recipe.ingredients);
    const ingredientsArr = parseIngredients(data.recipe.ingredients);
    //console.log('parsed', ingredientsArr);

    const recipe = updateObject(data.recipe, { ingredients: ingredientsArr });
    //console.log(recipe);

    return recipe;
  } else {
    //console.log('Fetch unsuccessful');
    return null;
  }
};
