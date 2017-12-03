import React from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import PasswordField from 'material-ui-password-field';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { login, fetchUsername, fetchSavedMovies } from '../actions/MovieAction';

import { bindActionCreators } from 'redux';
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

export class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      logged: "",
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state[e.target.name]);
  }

  logInUser(obj) {
    console.log('hello')
    if (this.state.password === this.state.password2) {
      alert('password dont match idiot')
    } else {
      axios.post('/login', {username: this.state.username, password: this.state.password})
        .then((res) => {
          console.log(res.data);
          // this.setState({logged: res.data});
          
          //dispatch actions
          
          this.props.login(res.data);
          if (res.data) {
            this.props.fetchUsername(this.state.username, );
            //this.props.fetchSavedMovies(this.state.username);

            //TODO can probably delete this,
            this.props.fetchSavedMovies(this.state.username);
            //also save the savedMovies from the database associated
            // with the user to Redux Store.
          }

          console.log(this.state.logged);
          if (res.data) {
            this.props.history.push('/');
          } else {
            alert("Username/Password combo not found");
          }
        })
        .catch((err) => { console.log(err)})
    }
  }

  render() {
    return (
      <div>
        <h1 style={{margin: '35px'}}>Welcome</h1>
        <TextField
          floatingLabelText="Enter username"
          name="username"
          onChange={this.handleChange.bind(this)}
        />
        <br />
        <PasswordField
          hintText="At least 8 characters"
          floatingLabelText="Enter your password"
          errorText="Your password is too short"
          name="password"
          onChange={this.handleChange.bind(this)}/>
        <br/>
        <br/>
        
        <RaisedButton label="Log In" primary={true} style={style} onClick={this.logInUser.bind(this)}/>

        <RaisedButton label="Sign Up" primary={true} style={style} containerElement={<Link to="/signup"/>}/>

        <br/>
        <Link to="/signup">Don't have an account?</Link>
        <br/>   
        <br/>
      </div>
    );
  }
}
// export default Login;


function mapStateToProps({ login }) {
  return { login };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, fetchUsername, fetchSavedMovies }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
