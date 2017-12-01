import React from 'react';
import axios from 'axios';
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

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password2: ""
    }
  }

  handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
      console.log(this.state[e.target.name])
  }

  createUser(obj) {
    if (this.state.password === this.state.password2) {
      alert('password dont match idiot')
    } else {
      axios.post('/signUp', {username: this.state.username, password: this.state.password})
        .then(() => {
          console.log('success from sign up')
        })
        .catch(() => { console.log('fail')})
    }
  }

  render() {  
    return (
      <div>
        <h1 style={{margin: '35px'}}>Sign Up</h1>
        <TextField
          floatingLabelText="Enter username"
          name="username"
          onChange={this.handleChange.bind(this)}
        /><br />
        <PasswordField
          hintText="At least 8 characters"
          floatingLabelText="Enter your password"
          errorText="Your password is too short"
          name="password"
          onChange={this.handleChange.bind(this)}
        /><br/>
         <PasswordField
          hintText="At least 8 characters"
          floatingLabelText="Re-Enter your password"
          errorText="Your password is too short"
          name="password2"
          onChange={this.handleChange.bind(this)}
        /><br/>
        <br/>
        <RaisedButton label="Create Account" onClick={this.createUser.bind(this)} primary={true} style={style} />
        <br/>
        <Link to="/login">Already have an account?</Link>
        <br/>   
        <br/>
      </div>
    );
  }
}
export default Signup;