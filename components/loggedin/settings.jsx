import React from 'react';
import GraphOptionsComp from '../GraphOptionsComp.jsx';
import UpdateSettingsComp from '../UpdateSettingsComp';

class Settings extends React.Component {

	constructor() {
		super();
	}

	render () {
		return (
		<div style={{width: '100%'}}>
		    <h1>
		      Settings
		    </h1>
		    <UpdateSettingsComp />
		    <GraphOptionsComp />
		</div>
		)
	}
};

const styles = {
	chip: {
	    margin: 4
	}
};



export default Settings;