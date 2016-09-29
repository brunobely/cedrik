import React, { Component } from 'react';
import './App.css';
import styles from './Styles';
import Radium from 'radium';

function CedrikHeader (props) {
	//Make CEDRIK link to home URL
	//Make a Facebook page for CEDRIK?
	return (
		<div className="CedrikHeader" style={styles.cedrikHeader}>
			<span>CEDRIK</span>
			<a
				className="gitHubButton"
				target="_blank"
				href="http://github.com/brunobely/cedrik"
			>
				<i className="fa fa-github"></i>
			</a>
		</div>
	);
}

/* Radium */
CedrikHeader = Radium(CedrikHeader);

export default CedrikHeader;