import React from 'react';
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const style = {
  margin: 12,
};

const styles = {
  toggle: {
    marginBottom: 16,
  }
};


class GraphOptionsComp extends React.Component {

	constructor() {
		super();
	}
	toggled(e) {
		console.log('was toggled', e.target.value);
	}

	render() {
		return (
			<div style={{'width': '100%', 'margin': '20px'}}>
				<br />
				<h6>Graph Options:</h6>
				<div style={{'width': '50%', 'left': '15%', 'position': 'relative', 'padding': '10px'}}>
				    <Toggle onToggle={this.toggled.bind(this)}
				      label="Line Graph"
				      defaultToggled={true}
				      style={styles.toggle}
				      value="LineGraph"
				    />
				    <Toggle onToggle={this.toggled.bind(this)}
				      label="Bar Graph"
				      style={styles.toggle}
				      value="BarGraph"
				    />
			    </div>
		    </div>
		);

	}
  
}

export default GraphOptionsComp;