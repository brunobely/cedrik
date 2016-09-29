import React, { Component } from 'react';
import './App.css';
import styles from './Styles';
import Radium from 'radium';

function InfoBar (props) {
	// Information to include:
	//  - How many standard drinks this recipe makes (fontawesome cubes?)
	//  	- show limiting ingredient and how much is left of the rest in hover tip
	//  ✔ Volume for 1 standard drink (measuring cup? partially-filled cup?)
	//  ✔ ABV in recipe (strongness) (flexing icon)
	//  - $ of 1 standard drink ($ in a shotglass/cup)
	//  ✔ Total $ ($ in a circle?)

	// Maybe add a 'hover for more info' at the bottom?

	// REMEMBER TO ADD ALCOHOL AND SALES TAX SUPPORT!!!


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
			console.log(drinksAcanMake + ' < ' + drinksBcanMake);
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

	var additionalStyle = { width: '20%' };

	return (
		<div className="InfoBar" style={styles.infoBar}>
			<div className="infoQuantity" style={[styles.infoQuantity, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#7E57C2' }]} className="fa fa-cubes"></i>
				<div style={styles.infoCostTotalText}>{ingredients.length == 0 ? '—' : Math.floor(batchSize)}</div>
			</div>
			<div className="infoVolStandard" style={[styles.infoVolStandard, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#42A5F5' }]} className="fa fa-flask"></i>
				<div style={styles.infoCostTotalText}>{ingredients.length == 0 ? '—' : volumeStandard.toFixed(0)} ml</div>
			</div>
			<div className="infoStrength" style={[styles.infoStrength, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#ef5350' }]} className="fa fa-tint"></i>
				<div style={styles.infoCostTotalText}>{ingredients.length == 0 ? '— ' : (drinkABV * 100).toFixed(1)}%</div>
			</div>
			<div className="infoCostStandard" style={[styles.infoCostStandard, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#FFA726' }]} className="fa fa-glass"></i>
				<div style={styles.infoCostTotalText}>$ {ingredients.length == 0 ? '—' : standardDrinkPrice.toFixed(2)}</div>
			</div>
			<div className="infoCostTotal" style={[styles.infoCostTotal, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#66BB6A' }]} className="fa fa-usd"></i>
				<div style={styles.infoCostTotalText}>{ingredients.length == 0 ? '—' : totalPrice.toFixed(2)}</div>
			</div>
		</div>
	);
}

/* Radium */
InfoBar = Radium(InfoBar);

export default InfoBar;