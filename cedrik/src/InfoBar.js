import React, { Component } from 'react';
import './App.css';
import styles from './Styles';
import Radium from 'radium';
import ReactTooltip from 'react-tooltip';

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

	var additionalStyle = { width: '20%' };

	return (
		<div className="InfoBar" style={styles.infoBar}>
			<div data-tip data-for={props.drinkID + 'quantity'} className="infoQuantity" style={[styles.infoQuantity, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#7E57C2' }]} className="fa fa-cubes"></i>
				<div style={styles.infoCostTotalText}>{!isFinite(batchSize) ? '—' : Math.floor(batchSize)}</div>
			</div>
			<ReactTooltip
				id={props.drinkID + 'quantity'}
				style={[styles.tooltipBase, styles.tooltipQuantity]}
				effect="solid"
			>
				<span className="infoBarQuantityHeader">Batch Size</span>
				<p className="infoBarP">The number of standard</p>
				<p className="infoBarP">drinks you can make</p>
				<p className="infoBarP">with this recipe</p>
			</ReactTooltip>



			<div data-tip data-for={props.drinkID + 'volStandard'} className="infoVolStandard" style={[styles.infoVolStandard, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#42A5F5' }]} className="fa fa-flask"></i>
				<div style={styles.infoCostTotalText}>{!isFinite(volumeStandard) ? '—' : volumeStandard.toFixed(0)} ml</div>
			</div>
			<ReactTooltip
				id={props.drinkID + 'volStandard'}
				style={[styles.tooltipBase, styles.tooltipVolStandard]}
				effect="solid"
			>
				<span className="infoBarVolStandardHeader">Size</span>
				<p className="infoBarP">The volume of a</p>
				<p className="infoBarP">standard drink</p>
				<p className="infoBarP">made with this</p>
			</ReactTooltip>



			<div data-tip data-for={props.drinkID + 'strength'} className="infoStrength" style={[styles.infoStrength, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#ef5350' }]} className="fa fa-tint"></i>
				<div style={styles.infoCostTotalText}>{!isFinite(drinkABV) ? '— ' : (drinkABV * 100).toFixed(1)}%</div>
			</div>
			<ReactTooltip
				id={props.drinkID + 'strength'}
				style={[styles.tooltipBase, styles.tooltipStrength]}
				effect="solid"
			>
				<span className="infoBarStrengthHeader">Strength</span>
				<p className="infoBarP">The alcohol</p>
				<p className="infoBarP">by volume in</p>
				<p className="infoBarP">this drink</p>
			</ReactTooltip>



			<div data-tip data-for={props.drinkID + 'costStandard'} className="infoCostStandard" style={[styles.infoCostStandard, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#FFA726' }]} className="fa fa-glass"></i>
				<div style={styles.infoCostTotalText}>$ {!isFinite(standardDrinkPrice) ? '—' : standardDrinkPrice.toFixed(2)}</div>
			</div>
			<ReactTooltip
				id={props.drinkID + 'costStandard'}
				style={[styles.tooltipBase, styles.tooltipCostStandard]}
				effect="solid"
			>
				<span className="infoBarCostStandardHeader">Standard Drink Cost</span>
				<p className="infoBarP">The cost of a</p>
				<p className="infoBarP">standard drink made</p>
				<p className="infoBarP">with this recipe</p>
			</ReactTooltip>



			<div data-tip data-for={props.drinkID + 'costTotal'} className="infoCostTotal" style={[styles.infoCostTotal, additionalStyle]}>
				<i style={[styles.infoSymbol, { color: '#66BB6A' }]} className="fa fa-usd"></i>
				<div style={styles.infoCostTotalText}>{!isFinite(totalPrice) ? '—' : totalPrice.toFixed(2)}</div>
			</div>
			<ReactTooltip
				id={props.drinkID + 'costTotal'}
				style={[styles.tooltipBase, styles.tooltipCostTotal]}
				effect="solid"
			>
				<span className="infoBarCostTotalHeader">Total Cost</span>
				<p className="infoBarP">The total cost of</p>
				<p className="infoBarP">the ingredients</p>
				<p className="infoBarP">in this recipe</p>
			</ReactTooltip>
		</div>
	);
}

/* Radium */
InfoBar = Radium(InfoBar);

export default InfoBar;