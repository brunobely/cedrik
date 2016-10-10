import color from 'color';
import stylesInfoBar from './Styles-InfoBar.js';
import stylesCompareView from './Styles-CompareView.js';

const styles = {
	...stylesInfoBar,
	...stylesCompareView,
	boldface: {
		fontWeight: 700
	},
	hidden: {
		display: 'none'
	},
	addIngredient: {

	},
	cedrikHeader: {
		position: 'fixed',
		zIndex: '99',
		top: 0,
		width: '100%',
		height: 60,
		// display: 'inline-block',
		// verticalAlign: 'middle',
		lineHeight: '62px',
		marginBottom: '10px',
		fontFamily: 'Racing Sans One',
		fontSize: '2.25em',
		color: 'white',
		backgroundColor: '#FFD54F',
		boxShadow: '0 2px 0 0 #FFCA28, 0 2px 7px 0 #C3C3C3',
	},
	input: {
		fontSize: '1em',
		color: '#434343',
		marginBottom: '2px',
		padding: '0 5px',
		boxSizing: 'border-box',
		width: '100%',
		// textAlign: 'right',
		borderRadius: '3px',
		outline: 'none',
		':hover': {
			backgroundColor: color('#C4C4C4').lighten(0.25).hexString(),
		},
		':focus': {
			backgroundColor: color('#C4C4C4').lighten(0.2).hexString(),
		},
		':active': {
			backgroundColor: color('#C4C4C4').lighten(0.1).hexString(),
		}
	},
	addDrinkButton: {
		margin: '20px',
		width: '40px',
		height: '40px',
		borderRadius: '25px',
		color: 'white',
		backgroundColor: '#81C784',
		textShadow: '0 1px #737373',
		// boxShadow: 'inset 0 1px 0 0 #737373, inset 0 -1px 0 0 #DBDBDB',
		border: '1px solid #4CAF50',
		boxShadow: '0 2px 2px 0 #DBDBDB',
		outline: 'none',
		':hover': {
			backgroundColor: color('#81C784').darken(0.1).hexString(),
		},
		':focus': {
			backgroundColor: color('#81C784').darken(0.2).hexString(),
		},
		':active': {
			backgroundColor: color('#81C784').darken(0.25).hexString(),
		}
	},
	addIngredientButton: {
		fontSize: '0.8em',
		fontWeight: '300',
		color: '#C4C4C4',
		marginTop: '5px',
		width: '100%',
		height: 35,
		borderRadius: '4px',
		border: 'dashed 1px #DBDBDB',
		backgroundColor: 'transparent',
		outline: 'none',
		':hover': {
			backgroundColor: color('#C4C4C4').lighten(0.25).hexString(),
		},
		':focus': {
			backgroundColor: color('#C4C4C4').lighten(0.2).hexString(),
			color: color('#C4C4C4').darken(0.15).hexString()
		},
		':active': {
			backgroundColor: color('#C4C4C4').lighten(0.1).hexString(),
			color: color('#C4C4C4').darken(0.3).hexString()
		}
	},
	emptyDrinksLabel: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		/* added on top of 'drink' style */
		height: '133px', /* 133 maybe so it's the same size? */ /* or 75px cuz it looks gud */
		// lineHeight: '133px',
		fontSize: '0.85em',
		color: '#C3C3C3',
		backgroundColor: 'transparent',
		border: 'dashed 1px #DBDBDB',
		boxShadow: 'none',
	},
	// emptyIngredientsLabel: {
	// 	height: '35px',
	// 	width: '100%',
	// },
	drink: {
		// overflow: 'hidden',
		position: 'relative',
		backgroundColor: 'white',
		boxSizing: 'border-box',
		width: '100%',
		// minWidth: '335px',
		maxWidth: '600px',
		margin: '20px auto 0 auto',
		padding: '15px',
		borderRadius: '9px',
		border: 'solid 1px #DBDBDB',
		boxShadow: '0 2px 2px 0 #DBDBDB'
	},
	drinkName: {
		marginTop: '10px',
		// fontWeight: '700',
		// fontSize: '1.15em',
		color: '#434343',
	},
	drinkHeader: {
		marginTop: '5px',
		fontSize: '0.75em',
		width: '100%',
		height: '35px',
		boxSizing: 'border-box',
		lineHeight: '35px',
		fontWeight: '700',
		color: '#434343'
	},
	drinkHeaderRatio: {
		width: '7.5%',
		paddingLeft: '0.75%',
		float: 'left',
		textAlign: 'center',
		boxSizing: 'border-box',
	},
	drinkHeaderName: {
		width: '47.5%',
		float: 'left',
		textAlign: 'left',
		paddingLeft: 'calc(2% + 5px)',
		boxSizing: 'border-box'
	},
	drinkHeaderSize: {
		width: '15%',
		float: 'left',
		textAlign: 'center',
	},
	drinkHeaderABV: {
		width: '10%',
		float: 'left',
		textAlign: 'center',
		paddingLeft: '2%',
		boxSizing: 'border-box',
	},
	drinkHeaderPrice: {
		width: '20%',
		float: 'left',
		textAlign: 'right',
		paddingRight: 'calc(2% + 5px)',
		boxSizing: 'border-box',
	},
	ingredient: {
		fontSize: '0.85em',
		color: '#434343',
		width: '100%',
		boxSizing: 'border-box',
		height: 35,
		lineHeight: '35px',
		':hover': {
			boxShadow: '0 0 0 1px #DBDBDB',
			borderRadius: '4px 0 0 4px',
		}
	},
	ingredientRatio: {
		// minWidth: 30,
		width: '7.5%',
		paddingLeft: '1%',
		// height: '100%',
		float: 'left',
		fontWeight: 400,
		textAlign: 'center',
		boxSizing: 'border-box',
	},
	ingredientName: {
		// minWidth: 300,
		width: '47.5%',
		maxWidth: 'calc(47.5% - 20px)',
		// height: '100%',
		float: 'left',
		fontWeight: 700,
		textAlign: 'left',
		paddingLeft: '2%',
		boxSizing: 'border-box',
	},
	ingredientSize: {
		minWidth: 50,
		width: '11%',
		// height: '100%',
		float: 'left',
		fontWeight: 400,
		textAlign: 'right',
		paddingLeft: '1%',
		boxSizing: 'border-box',
	},
	ingredientML: {
		width: '4%',
		float: 'left',
		fontWeight: 400,
		paddingRight: '1%',
		textAlign: 'right',
		boxSizing: 'border-box',
	},
	ingredientABV: {
		minWidth: 30,
		width: '7%',
		// height: '100%',
		float: 'left',
		fontWeight: 400,
		textAlign: 'right',
		paddingLeft: '1%',
		boxSizing: 'border-box',
	},
	ingredientPercentSign: {
		width: '3%',
		float: 'left',
		fontWeight: 400,
		paddingRight: '1%',
		textAlign: 'right',
		boxSizing: 'border-box',
	},
	dollarSign: {
		// minWidth: 36,
		width: '6%',
		paddingRight: '1%',
		// height: '100%',
		float: 'left',
		fontWeight: 700,
		textAlign: 'right',
		boxSizing: 'border-box',
	},
	ingredientPrice: {
		// minWidth: 84,
		width: '14%',
		paddingRight: '2%',
		// height: '100%',
		float: 'left',
		fontWeight: 400,
		textAlign: 'right',
		boxSizing: 'border-box',
	}
}

export default styles;