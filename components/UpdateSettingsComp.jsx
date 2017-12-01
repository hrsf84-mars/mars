import React from 'react';
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const style = {
  margin: 12,
};

var UpdateSettingsComp = () => (
	<div style={{'margin': '20px' }}>
    	<h6>Change passport:</h6>
    	<PasswordField
        floatingLabelText="Enter old password"/>

        <br />
        <PasswordField
        floatingLabelText="Enter new password"/>
        <br />
        <RaisedButton label="Change Password" primary={true} style={style} />
    </div>	
)

export default UpdateSettingsComp;
