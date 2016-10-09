import React, { Component } from 'react';
import './App.css';
import styles from './Styles';
import Radium from 'radium';
import ReactTooltip from 'react-tooltip';

// MAKE COMPARE/ADD ONE COMPONENT
function CompareButton (props) {
	return (
		<button
			type="button"
			className="CompareButton"
			style={[styles.compareButton, !props.shouldDisplay && styles.hidden]}
			onClick={props.onCompare.bind(null)}
		>
			Compare <i className="fa fa-balance-scale"></i>
		</button>
	);
}

function CompareView (props) {
	var compareHeight;

	var noDrinks;
	if (props.drinks.length == 0) {
		noDrinks = true;
		compareHeight = '90px';
	}
	else {
		noDrinks = false;
		compareHeight = 30 + (props.drinks.length * 60) + 'px';
	}

	var compareRows = props.drinks.map((item) =>
		<CompareRow
			key={item.id}
			drinkID={item.id}
			drinkName={item.name}
			ingredients={item.ingredients}
		/>
	);

	return (
		<div>
			<div
				className="CompareView"
				style={[styles.compareView, !props.shouldDisplay && styles.hidden, { height: compareHeight }]}
			>
				<button
					type="button"
					className="closeCompareButton"
					style={styles.closeCompareButton}
					onClick={props.onCompare.bind(null)}
				>
					<i className="fa fa-angle-double-down"></i> Hide Comparison <i className="fa fa-angle-double-down"></i>
				</button>
				<div
					className="spacingDivButton"
					style={styles.spacingDivButton}
				>
				</div>
				{compareRows}
				<EmptyDrinksRow shouldDisplay={noDrinks} />
			</div>
			<div
				className="spacingDiv"
				style={[styles.spacingDiv, !props.shouldDisplay && styles.hidden, { height: compareHeight }]}
			>
			</div>
		</div>
	);
}

function CompareRow (props) {

	//REFACTOR: EXACT SAME CODE IN InfoBar.js. MAKE THIS A FUNCTION PLZ
	var ingredients = props.ingredients;

	if (ingredients.length == 0) {

	}
	else {
		// The total cost of the ingredients in this recipe
		var totalPrice = ingredients.reduce( (a, b) => {
			return a + Number(b['price']);
		}, 0);

		// An array with the alcoholic ingredients in the drink
		var alcoholicIngredients = ingredients.filter( (i) => {
			return Number(i['abv']) > 0;
		});

		// The sum of the ratios of the alcoholic ingredients
		var totalAlcoholicParts = alcoholicIngredients.reduce( (a, b) => {
			return a + Number(b['ratio']);
		}, 0);

		// An array with the non-alcoholic ingredients in the drink
		var mixers = ingredients.filter( (i) => {
			return Number(i['abv']) == 0;
		});

		// The sum of the ratios of the non-alcoholic ingredients
		var totalMixerParts = mixers.reduce( (a, b) => {
			return a + Number(b['ratio']);
		}, 0);

		// The sum of the ratios of all ingredients
		var totalParts = totalAlcoholicParts + totalMixerParts;

		// The resulting ABV in the drink
		var drinkABV = alcoholicIngredients.reduce( (a, b) => {
			return a + Number(b['ratio'])*(Number(b['abv'])/100);
		}, 0)/totalParts;


		// The volume (in ml) in a standard drink made of this
		var volumeStandard = 17.7 / drinkABV;


		// The volume (in ml) of each part in the standard drink
		var volumePerPart = volumeStandard / totalParts;

		// The ingredient that is depleted first when making this recipe repeatedly
		var limitingIngredient = ingredients.reduce( (a, b) => {
			var drinksAcanMake = Number(a['size'])/(Number(a['ratio']) * volumePerPart);
			var drinksBcanMake = Number(b['size'])/(Number(b['ratio']) * volumePerPart);
			// console.log(drinksAcanMake + ' < ' + drinksBcanMake);
			return drinksAcanMake < drinksBcanMake ? a : b;
		}, ingredients[0]);

		// How many standard drinks this recipe makes
		var batchSize = Number(limitingIngredient['size'])/(Number(limitingIngredient['ratio']) * volumePerPart);

		// 17.7 ml is the standard drink size in the US

		// The cost of making one standard drink (17.7 ml in the US) of this drink
		var standardDrinkPrice = ingredients.reduce( (a, b) => {
			var totalBvolumeInDrink = Number(b['ratio']) * volumePerPart;
			return a + ((totalBvolumeInDrink / Number(b['size'])) * Number(b['price']));
		}, 0);
	}

	return (
		<div
			className="CompareRow"
			style={styles.compareRow}
		>
			<div style={styles.compareDrinkName}>
				{props.drinkName}
			</div>

			<div style={styles.compareRowInfo}>
				<i style={[styles.infoSymbol, { color: '#7E57C2' }]} className="fa fa-cubes"></i>
				<div style={[styles.infoCostTotalText, { color: 'white' }]}>{!isFinite(batchSize) ? '—' : Math.floor(batchSize)}</div>

				<i style={[styles.infoSymbol, { color: '#42A5F5' }]} className="fa fa-flask"></i>
				<div style={[styles.infoCostTotalText, { color: 'white' }]}>{!isFinite(volumeStandard) ? '—' : volumeStandard.toFixed(0)} ml</div>

				<i style={[styles.infoSymbol, { color: '#ef5350' }]} className="fa fa-tint"></i>
				<div style={[styles.infoCostTotalText, { color: 'white' }]}>{!isFinite(drinkABV) ? '— ' : (drinkABV * 100).toFixed(1)}%</div>

				<i style={[styles.infoSymbol, { color: '#FFA726' }]} className="fa fa-glass"></i>
				<div style={[styles.infoCostTotalText, { color: 'white' }]}>$ {!isFinite(standardDrinkPrice) ? '—' : standardDrinkPrice.toFixed(2)}</div>

				<i style={[styles.infoSymbol, { color: '#66BB6A' }]} className="fa fa-usd"></i>
				<div style={[styles.infoCostTotalText, { color: 'white' }]}>{!isFinite(totalPrice) ? '—' : totalPrice.toFixed(2)}</div>
			</div>
		</div>
	);
}

function EmptyDrinksRow (props) {
	return (
		<div
			className="EmptyDrinksRow"
			style={[styles.compareEmptyDrinksRow, !props.shouldDisplay && styles.hidden]}
		>
			Start by adding some drinks to compare them!
		</div>
	);
}

/* Radium */
CompareButton = Radium(CompareButton);
CompareView = Radium(CompareView);
CompareRow = Radium(CompareRow);
EmptyDrinksRow = Radium(EmptyDrinksRow)

export { CompareButton, CompareView };