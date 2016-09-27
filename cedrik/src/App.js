import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './Styles';
import Radium from 'radium';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Drink drinkName="Kirkland Lemonade" />
			</div>
		);
	}
}

function Drink (props) {
	var ingredientList = [{
		id: 1,
		name: 'Kirkland Vodka',
		size: 1750,
		abv: 0.4,
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
	}]
	//new IDs: new Date().getUTCMilliseconds()
	var ingredients = ingredientList.map((item) => 
		<Ingredient
			key={item.id}
			radiumKey={item.id}
			name={item.name}
			size={item.size}
			abv={item.abv}
			price={item.price}
			ratio={item.ratio}
		/>
	)
	return (
		<div className="Drink" style={styles.drink}>
			<DrinkName>{props.drinkName}</DrinkName>
			<DrinkHeader />
			{ingredients}
			<AddIngredientButton />
		</div>
	);
}

function DrinkName (props) {
	return (
		<div className="DrinkName" style={styles.drinkName} >
			{props.children}
		</div>
	);
}

function DrinkHeader (props) {
	return (
		<div className="DrinkHeader" style={styles.drinkHeader}>
			<div style={styles.drinkHeaderRatio}>Ratio</div>
			<div style={styles.drinkHeaderName}>Name</div>
			<div style={styles.drinkHeaderSize}>Size</div>
			<div style={styles.drinkHeaderABV}>ABV</div>
			<div style={styles.drinkHeaderPrice}>Price</div>
		</div>
	);
}

function Ingredient (props) {
	return (
		<div
			className="Ingredient"
			key={props.radiumKey}
			style={styles.ingredient}
		>
			<div style={styles.ingredientRatio}><IngredientInput align="center">{props.ratio}</IngredientInput></div>
			<div style={styles.ingredientName}><IngredientInput align="left" weight="700">{props.name}</IngredientInput></div>
			<div style={styles.ingredientSize}><IngredientInput align="right">{props.size}</IngredientInput></div>
			<div style={styles.ingredientML}>ml</div>
			<div style={styles.ingredientABV}><IngredientInput align="right">{props.abv * 100}</IngredientInput></div>
			<div style={styles.ingredientPercentSign}>%</div>
			<div style={styles.dollarSign}>$</div>
			<div style={styles.ingredientPrice}><IngredientInput align="right">{props.price}</IngredientInput></div>
		</div>
	);
}

function IngredientInput (props) {
	var additionalStyle = { };

	if (props.align) {
		additionalStyle = {
			textAlign: props.align,
			...additionalStyle
		}
	}

	if (props.weight) {
		additionalStyle = {
			fontWeight: props.weight,
			...additionalStyle
		}
	}

	return (
		<input
			className="IngredientInput"
			value={props.children}
			style={Object.assign({},styles.ingredientInput, additionalStyle)}
		>

		</input>
	);
}

function AddIngredientButton (props) {
	return (
		<button
			type="button"
			className="AddIngredientButton"
			style={styles.addIngredientButton}
		>
			Add an ingredient
		</button>
	);
}

/* Radium */
Drink = Radium(Drink);
DrinkName = Radium(DrinkName);
DrinkHeader = Radium(DrinkHeader);
Ingredient = Radium(Ingredient);
IngredientInput = Radium(IngredientInput);
AddIngredientButton = Radium(AddIngredientButton);

export default App;
