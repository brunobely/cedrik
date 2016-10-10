import color from 'color';

const stylesInfoBar = {
	infoBar: {
		width: '100%',
		height: '40px',
		lineHeight: '40px',
		fontSize: '1.1em',
		marginTop: '15px',
		'@media only screen and (max-width: 550px)': {
			fontSize: '0.7em',
		}
	},
	infoQuantity: {
		height: '100%',
		float: 'left',
	},
	infoVolStandard: {
		height: '100%',
		float: 'left',
	},
	infoStrength: {
		height: '100%',
		float: 'left',
	},
	infoCostStandard: {
		height: '100%',
		float: 'left',
	},
	infoCostTotal: {
		height: '100%',
		float: 'left',
	},
	infoSymbol: {
		marginLeft: '5px',
		fontSize: '1.05em',
		'@media only screen and (max-width: 550px)': {
			fontSize: '0.65em',
		}
	},
	//Fix name
	infoCostTotalText: {
		float: 'right',
		textAlign: 'center',
		marginRight: '15px',
		width: '55%',
		fontWeight: '100',
		color: '#636363',
		'@media only screen and (max-width: 550px)': {
			marginRight: '5px',
		}
	},
	'tooltipBase': {
		
	},
	'tooltipQuantity': {
		
	},
	'tooltipVolStandard': {
		
	},
	'tooltipStrength': {
		
	},
	'tooltipCostStandard': {
		
	},
	'tooltipCostTotal': {

	}
}

export default stylesInfoBar;