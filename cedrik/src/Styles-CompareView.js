import color from 'color';

const stylesCompareView = {
	compareButton: {
		position: 'fixed',
		bottom: 0,
		right: 0,
		height: '35px',
		width: '20vw',
		minWidth: '200px',
		color: 'white',
		backgroundColor: '#4FC3F7',
		border: '1px solid #03A9F4',
		borderRadius: '6px 0 0 0',
		textShadow: '0 1px #737373',
		fontSize: '1em',
		outline: 'none',
		':hover': {
			backgroundColor: color('#4FC3F7').darken(0.1).hexString(),
		},
		':focus': {
			backgroundColor: color('#4FC3F7').darken(0.2).hexString(),
		},
		':active': {
			backgroundColor: color('#4FC3F7').darken(0.25).hexString(),
		}
	},
	closeCompareButton: {
		position: 'fixed',
		left: 0,
		height: '30px',
		width: '100%',
		color: 'white',
		backgroundColor: color('#4FC3F7').lighten(0.2).hexString(),
		textShadow: '0 1px #737373',
		fontSize: '0.95em',
		outline: 'none',
		':hover': {
			backgroundColor: color('#4FC3F7').lighten(0.2).darken(0.1).hexString(),
		},
		':focus': {
			backgroundColor: color('#4FC3F7').lighten(0.2).darken(0.2).hexString(),
		},
		':active': {
			backgroundColor: color('#4FC3F7').lighten(0.2).darken(0.25).hexString(),
		}
	},
	compareView: {
		position: 'fixed',
		bottom: 0,
		right: 0,
		width: '100%',
		height: '150px', // Set in CompareView.js
		maxHeight: '210px',
		backgroundColor: color('#4FC3F7').lighten(0.1).hexString(),
		overflow: 'scroll',
	},
	spacingDiv: {
		width: '100%',
		height: '150px', // Set in CompareView.js
		maxHeight: '210px',
	},
	spacingDivButton: {
		width: '100%',
		height: '30px',
	},
	compareRow: {
		padding: '5px 15px',
		height: '50px',
		color: 'white',
		'@media only screen and (max-width: 550px)': {
			padding: '5px 5px',
		}
	},
	// If drink name is too long, things get funky
	compareDrinkName: {
		display: 'flex',
		// justifyContent: 'center',
		alignItems: 'center',
		fontSize: '0.85em',
		fontWeight: '700',
		textAlign: 'left',
		width: 'calc(25% - 15px)',
		height: '100%',
		minWidth: '100px', // Will cause issues with compareRowInfo width which is 75%
		overflowWrap: 'break-word',
		wordBreak: 'break-all',
		float: 'left',
		'@media only screen and (max-width: 550px)': {
			fontSize: '0.75em',
		}
	},
	compareEmptyDrinksRow: {
		height: '60px',
		lineHeight: '60px',
		color: 'rgba(255,255,255,0.9)',
		fontSize: '0.8em',
	},
	compareRowInfo: {
		display: 'flex',
		alignItems: 'center',
		width: 'calc(75% - 15px)',
		height: '100%',
		float: 'left',
		'@media only screen and (max-width: 550px)': {
			fontSize: '0.70em'
		}
	}
}

export default stylesCompareView;