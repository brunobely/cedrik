import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './Styles';
import Radium from 'radium';
import CedrikHeader from './Header.js';
import InfoBar from './InfoBar.js';
import { CompareButton, CompareView } from './CompareView.js';
import keydown from 'react-keydown';

class App extends Component {
	// keypress(event) {
	// 	// event.preventDefault();
	// 	console.log(event.key);
	// }

	render() {
		// console.log(this.props.drinks);
		// console.log(document.activeElement === undefined ? document.activeElement : document.activeElement.tagName === 'INPUT');

		// https://css-tricks.com/snippets/javascript/javascript-keycodes/
		// https://www.npmjs.com/package/react-keydown
		// 68 is D, 73 is I
		// @keydown( 68 )
		// addDrink (event) {
		// 	event.preventDefault();
		// 	this.props.onAddDrink.bind(null, nextDrinkID);
		// }

		this.props.drinks.sort(function(a,b) {
			// Ascending: first ID less than the next
			return a.id - b.id;
		});

		var drinks = this.props.drinks.map((item) =>
			<Drink
				key={item.id}
				drinkID={item.id}
				drinkName={item.name}
				ingredients={item.ingredients}
				onRemoveDrink={this.props.onRemoveDrink}
				onChangeDrinkName={this.props.onChangeDrinkName}
				onAddIngredient={this.props.onAddIngredient}
				onRemoveIngredient={this.props.onRemoveIngredient}
				onChangeIngredientRatio={this.props.onChangeIngredientRatio}
				onChangeIngredientName={this.props.onChangeIngredientName}
				onChangeIngredientSize={this.props.onChangeIngredientSize}
				onChangeIngredientABV={this.props.onChangeIngredientABV}
				onChangeIngredientPrice={this.props.onChangeIngredientPrice}
			/>
		);

	var nextDrinkID = 0;
	if (this.props.drinks.length > 0)
		nextDrinkID = this.props.drinks.slice(-1)[0].id + 1;

		return (
			<div className="App">
				<CedrikHeader />
				<div className="container">
					<EmptyDrinksLabel shouldDisplay={this.props.drinks.length == 0}/>
					{drinks}
					<AddDrinkButton
						onAddDrink={this.props.onAddDrink}
						nextDrinkID={nextDrinkID}
					/>
					<CompareButton
						shouldDisplay={!this.props.comparison}
						onCompare={this.props.onCompare}
					/>
					<CompareView
						shouldDisplay={this.props.comparison}
						drinks={this.props.drinks}
						onCompare={this.props.onCompare}
					/>
				</div>
			</div>
		);
	}
}
// /\ unify CompareView and CompareButton

function Drink (props) {
	//new IDs: new Date().getUTCMilliseconds()

	// console.log(props.drinkID);
	props.ingredients.sort(function(a,b) {
		// Ascending: first ID less than the next
		return a.id - b.id;
	});
	// FIX IDS CAUSE NOT EVERY NEWLY-ADDED ELEMENT GOES AT THE END
	// MAYBE NEXT_ID IN EVERY DRINK
	var ingredients = props.ingredients.map((item) => 
		<Ingredient
			key={item.id}
			ingredientID={item.id}
			drinkID={props.drinkID}
			name={item.name}
			size={item.size}
			abv={item.abv}
			price={item.price}
			ratio={item.ratio}
			onRemoveIngredient={props.onRemoveIngredient}
			onChangeIngredientRatio={props.onChangeIngredientRatio}
			onChangeIngredientName={props.onChangeIngredientName}
			onChangeIngredientSize={props.onChangeIngredientSize}
			onChangeIngredientABV={props.onChangeIngredientABV}
			onChangeIngredientPrice={props.onChangeIngredientPrice}
		/>
	);
	
	// ingredients = ingredients.sort(function(a,b) { return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0); });
	
	var nextIngredientID = 0;
	if (props.ingredients.length > 0)
		nextIngredientID = props.ingredients.slice(-1)[0].id + 1;

	return (
		<div className="Drink" style={styles.drink}>
			<DrinkName drinkID={props.drinkID} onChangeDrinkName={props.onChangeDrinkName}>{props.drinkName}</DrinkName>
			<DrinkHeader />
			{ingredients}
			<hr className="drink-hr" />
			<AddIngredientButton
				drinkID={props.drinkID}
				onAddIngredient={props.onAddIngredient}
				nextIngredientID={nextIngredientID}
			/>
			<InfoBar drinkID={props.drinkID} ingredients={props.ingredients} />
			<button type="button" className="deleteDrinkButton" onClick={props.onRemoveDrink.bind(null, props.drinkID)}><i className="fa fa-remove"></i></button>
		</div>
	);
}

function DrinkName (props) {
	return (
		<div className="DrinkName" style={styles.drinkName} >
			<Input
				inputType="DrinkName"
				drinkID={props.drinkID}
				onChangeFunc={props.onChangeDrinkName} 
				align="center"
				size="1.15em"
				weight="700"
				clearButton="right"
			>
				{props.children}
			</Input>
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
			key={props.ingredientID}
			style={styles.ingredient}
		>
			<div style={styles.ingredientRatio}><Input validationType="decimal" ingredientID={props.ingredientID} drinkID={props.drinkID} onChangeFunc={props.onChangeIngredientRatio} align="center">{props.ratio}</Input></div>
			<div style={styles.ingredientName}><Input ingredientID={props.ingredientID} drinkID={props.drinkID} onChangeFunc={props.onChangeIngredientName} align="left" weight="700" clearButton="right">{props.name}</Input></div>
			<div style={styles.ingredientSize}><Input validationType="natural" ingredientID={props.ingredientID} drinkID={props.drinkID} onChangeFunc={props.onChangeIngredientSize} align="right">{props.size}</Input></div>
			<div style={styles.ingredientML}>ml</div>
			<div style={styles.ingredientABV}><Input validationType="percentage" ingredientID={props.ingredientID} drinkID={props.drinkID} onChangeFunc={props.onChangeIngredientABV} align="right">{props.abv}</Input></div>
			<div style={styles.ingredientPercentSign}>%</div>
			<div style={styles.dollarSign}>$</div>
			<div style={styles.ingredientPrice}><Input validationType="decimal" ingredientID={props.ingredientID} drinkID={props.drinkID} onChangeFunc={props.onChangeIngredientPrice} align="right">{props.price}</Input></div>
			<button type="button" className="deleteButton" onClick={props.onRemoveIngredient.bind(null, props.drinkID, props.ingredientID)}><i className="fa fa-lg fa-remove"></i></button>
		</div>
	);
}

function Input (props) {
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

	if (props.size) {
		additionalStyle = {
			fontSize: props.size,
			...additionalStyle
		}
	}

	var input;

	// For some reason, func()(); has to be called twice on line 198.
	// Therefore, this needs to return a function that returns a function.
	function onError(msg) {
		return function() {
			return function() {
				console.log(msg);	
			}
		}
	};

	function onDrinkChange () {
		return props.onChangeFunc.bind(null,input.value,props.drinkID);
	};

	function onIngredientChange () {
		return props.onChangeFunc.bind(null,input.value,props.drinkID,props.ingredientID);
	};

	function isNumeric(n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	return (
		<div className="Input">
			<input
				ref={node => {
					input = node;
				}}
				className="Input"
				value={props.validationType == undefined ? props.children : String(props.children).replace(/^0+(?!\.|$)/, '')}
				style={Object.assign({},styles.input, additionalStyle)}
				onFocus={()=>{input.select()}}
				onChange={() => {
					if (input.value == '' && props.validationType != 'string' && props.validationType != undefined) input.value = 0;
					
					var func = props.inputType == 'DrinkName' ? onDrinkChange : onIngredientChange;

					if (props.validationType == 'natural' && !/^[0-9]\d*$/.test(input.value)) {
						func = onError("Input must be a natural number");
					}
					else if (props.validationType == 'decimal' && (!isNumeric(input.value) || parseFloat(input.value) < 0)) {
						func = onError("Input must be a positive decimal number");
					}
					else if (props.validationType == 'percentage' && (!isNumeric(input.value) || parseFloat(input.value) < 0 || parseFloat(input.value) > 100 )) {
						func = onError("Input must be a decimal number between 0 and 100");
					}
					func()();
				}}
			>

			</input>
		</div>
	);
}

function EmptyDrinksLabel (props) {
	// console.log(props);
	// console.log(styles.hidden);
	return (
		<div className="EmptyDrinksLabel" style={[styles.drink, styles.emptyDrinksLabel, !props.shouldDisplay && styles.hidden]}>
			Looks like you could use a drink! Click the button below to start adding.
		</div>
	);
}

// function EmptyIngredientsLabel (props) {
// 	return (
// 		<div className="EmptyIngredientsLabel" style={styles.emptyIngredientsLabel}>

// 		</div>
// 	);
// }

function AddDrinkButton (props) {
	return (
		<button
			type="button"
			className="AddDrinkButton"
			style={styles.addDrinkButton}
			onClick={props.onAddDrink.bind(null, props.nextDrinkID)}
		>
			<i className="fa fa-lg fa-plus"></i>
		</button>
	);
}

function AddIngredientButton (props) {
	return (
		<button
			type="button"
			className="AddIngredientButton"
			style={styles.addIngredientButton}
			onClick={props.onAddIngredient.bind(null, props.drinkID, props.nextIngredientID)}
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
Input = Radium(Input);
EmptyDrinksLabel = Radium(EmptyDrinksLabel);
// EmptyIngredientsLabel = Radium(EmptyIngredientsLabel);
AddDrinkButton = Radium(AddDrinkButton);
AddIngredientButton = Radium(AddIngredientButton);

export default App;
