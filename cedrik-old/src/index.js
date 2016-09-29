import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { combineReducers } from 'redux';
// const cedrikApp = combineReducers({
// 	drinks
// });

import { createStore } from 'redux';
const store = createStore(drinks);



/////////// Reducers

const ingredient = (state, action) => {
	switch (action.type) {
		case 'CHANGE_INGREDIENT_RATIO':
			return {
				...state,
				ratio: action.ratio
			};
		case 'CHANGE_INGREDIENT_NAME':
			return {
				...state,
				name: action.name
			};
		case 'CHANGE_INGREDIENT_SIZE':
			return {
				...state,
				size: action.size
			};
		case 'CHANGE_INGREDIENT_ABV':
			return {
				...state,
				abv: action.abv
			};
		case 'CHANGE_INGREDIENT_PRICE':
			return {
				...state,
				price: action.price
			}
		case 'REMOVE_INGREDIENT':
			return state.id !== action.ingredientID;
		default:
			return state;
	}
}

const drink = (state, action) => {
	switch (action.type) {
		case 'ADD_DRINK':
			return {
				id: action.drinkID,
				name: 'My Drink',
				ingredients: []
			};
		case 'REMOVE_DRINK':
			console.log('remove_drink');
			return state.id != action.drinkID;
		case 'CHANGE_DRINK_NAME':
			return {
				...state,
				name: action.name
			};
		case 'CHANGE_INGREDIENT_RATIO':
		case 'CHANGE_INGREDIENT_NAME':
		case 'CHANGE_INGREDIENT_SIZE':
		case 'CHANGE_INGREDIENT_ABV':
		case 'CHANGE_INGREDIENT_PRICE':
			return {
				...state,
				ingredients: [
					...state.ingredients.filter(i => i.id != action.ingredientID),
					ingredient(state.ingredients.filter(i => i.id == action.ingredientID)[0], action)
				]
			};
		default:
			return state;
	}
}

function drinks (state = {
		drinks: [
			{
				id: 1,
				name: 'Kirkland Lemonade',
				ingredients: [
					{
						id: 1,
						name: 'Kirkland Vodka',
						size: 1750,
						abv: 40,
						price: 13.89,
						ratio: 1
					},
					{
						id: 2,
						name: 'Lemonade',
						size: 600,
						abv: 0,
						price: 2.89,
						ratio: 2
					}
				]
			},
			{
				id: 2,
				name: 'Sex on the Beach',
				ingredients: [
					{
						id: 1,
						name: 'Kirkland Vodka',
						size: 1750,
						abv: 40,
						price: 13.89,
						ratio: 3
					},
					{
						id: 2,
						name: 'Peach Schnapps',
						size: 1000,
						abv: 23,
						price: 9.99,
						ratio: 1
					},
					{
						id: 3,
						name: 'Orange Juice',
						size: 2500,
						abv: 0,
						price: 3.49,
						ratio: 4
					},
					{
						id: 4,
						name: 'Cranberry Juice',
						size: 2500,
						abv: 0,
						price: 3.49,
						ratio: 4
					}
				]
			}
		]
	}, action) {
	// console.log('Reducer');
	// console.log(action.type);
	switch (action.type) {
		case 'ADD_DRINK':
			return {
				drinks: [
					...state.drinks,
					drink(undefined, action)
				]
			};
		case 'REMOVE_DRINK':
			return {
				drinks: [
					...state.drinks.filter(d => drink(d, action))
				]
			};
		case 'CHANGE_DRINK_NAME':
		case 'CHANGE_INGREDIENT_RATIO':
		case 'CHANGE_INGREDIENT_NAME':
		case 'CHANGE_INGREDIENT_SIZE':
		case 'CHANGE_INGREDIENT_ABV':
		case 'CHANGE_INGREDIENT_PRICE':
			return {
				drinks: [
					...state.drinks.filter(d => d.id != action.drinkID),
					drink(state.drinks.filter(d => d.id == action.drinkID)[0], action)
				]
			}
		case 'ADD_INGREDIENT':
			return { drinks: addIngredient(state.drinks, action.drinkID, action.ingredientID) }
		case 'REMOVE_INGREDIENT':
			return {
				drinks: [
					...state.drinks.filter(d => d.id != action.drinkID),
					{
						...state.drinks.filter(d => d.id == action.drinkID)[0],
						ingredients: state.drinks.filter(d => d.id == action.drinkID)[0].ingredients.filter(i => ingredient(i, action))
					}
				]
			}
		default:
			return state;
	}
}

const addIngredient = (drinks, targetDrinkID, ingredientID) => {
	var targetDrink = drinks.filter(d => d.id == targetDrinkID)[0];
	// console.log(targetDrink);
	// console.log('ran');
	// console.log(ingredientID);

	return [
		...drinks.filter(d => d.id != targetDrinkID),
		{
			...targetDrink,
			ingredients: [
				...targetDrink.ingredients,
				{
					id: ingredientID,
					ratio: '1',
					name: 'My Ingredient',
					size: '1000',
					abv: '0',
					price: '7.99'
				}
			]
		}
	];
}

//new Date().getUTCMilliseconds()

const render = () => {
	ReactDOM.render(
		<App
			{...store.getState()}
			onChangeDrinkName={(drinkName, drinkID) =>
				store.dispatch({ type: 'CHANGE_DRINK_NAME', name: drinkName, drinkID: drinkID})
			}
			onAddDrink={(drinkID) => 
				store.dispatch({ type: 'ADD_DRINK', drinkID: drinkID })
			}
			onRemoveDrink={(drinkID) => 
				store.dispatch({ type: 'REMOVE_DRINK', drinkID: drinkID })
			}
			onAddIngredient={(drinkID, ingredientID) => 
				store.dispatch({ type: 'ADD_INGREDIENT', drinkID: drinkID, ingredientID: ingredientID })
			}
			onRemoveIngredient={(drinkID, ingredientID) => 
				store.dispatch({ type: 'REMOVE_INGREDIENT', drinkID: drinkID, ingredientID: ingredientID })
			}
			onChangeIngredientRatio={(ratio, drinkID, ingredientID) =>
				store.dispatch({ type: 'CHANGE_INGREDIENT_RATIO', ratio: ratio, drinkID: drinkID, ingredientID: ingredientID})
			}
			onChangeIngredientName={(name, drinkID, ingredientID) =>
				store.dispatch({ type: 'CHANGE_INGREDIENT_NAME', name: name, drinkID: drinkID, ingredientID: ingredientID})
			}
			onChangeIngredientSize={(size, drinkID, ingredientID) =>
				store.dispatch({ type: 'CHANGE_INGREDIENT_SIZE', size, drinkID, ingredientID})
			}
			onChangeIngredientABV={(abv, drinkID, ingredientID) =>
				store.dispatch({ type: 'CHANGE_INGREDIENT_ABV', abv, drinkID, ingredientID})
			}
			onChangeIngredientPrice={(price, drinkID, ingredientID) =>
				store.dispatch({ type: 'CHANGE_INGREDIENT_PRICE', price, drinkID, ingredientID})
			}
		/>,
		document.getElementById('root')
	);
}

store.subscribe(render);
render();

export default store;