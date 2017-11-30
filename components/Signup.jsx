import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PasswordField from 'material-ui-password-field';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';

const style = {
  margin: 12,
};

function Signup(props) {
  return (
    <div>
      <h1 style={{margin: '35px'}}>Sign Up</h1>
      <TextField
        floatingLabelText="Enter username"
      /><br />
      <PasswordField
        hintText="At least 8 characters"
        floatingLabelText="Enter your password"
        errorText="Your password is too short"
      /><br/>
       <PasswordField
        hintText="At least 8 characters"
        floatingLabelText="Re-Enter your password"
        errorText="Your password is too short"
      /><br/>
      <br/>
      <RaisedButton label="Create Account" primary={true} style={style} />
      <br/>
      <Link to="/login">Already have an account?</Link>
      <br/>   
      <br/>
    </div>
  );
}

export default Signup;