import color from 'color';

const styles = {
	boldface: {
		fontWeight: 700
	},
	addIngredient: {

	},
	addIngredientButton: {
		fontSize: '0.8em',
		fontWeight: '300',
		color: '#C4C4C4',
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
	drink: {
		backgroundColor: 'white',
		width: '50vw',
		minWidth: '600px',
		margin: '10vh auto',
		padding: '15px',
		borderRadius: '9px',
		border: 'solid 1px #DBDBDB'
	},
	drinkName: {
		marginTop: '10px',
		fontWeight: '700',
		fontSize: '1.15em',
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
		width: '5%',
		float: 'left',
		textAlign: 'center'
	},
	drinkHeaderName: {
		width: '50%',
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
			borderRadius: '4px'
		}
	},
	ingredientRatio: {
		// minWidth: 30,
		width: '5%',
		// height: '100%',
		float: 'left',
		fontWeight: 400,
		textAlign: 'center',
		boxSizing: 'border-box',
	},
	ingredientName: {
		// minWidth: 300,
		width: '50%',
		// height: '100%',
		float: 'left',
		fontWeight: 700,
		textAlign: 'left',
		paddingLeft: '2%',
		boxSizing: 'border-box',
	},
	ingredientSize: {
		// minWidth: 90,
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
	ingredientInput: {
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
	ingredientABV: {
		// minWidth: 60,
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