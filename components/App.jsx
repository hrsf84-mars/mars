import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';
import Financials from '../containers/Financials';

import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Menu from './Menu.jsx';

import Settings from './loggedin/settings.jsx';
import SavedSearches from './loggedin/SavedSearches.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super();
  }

  //this.props.history.location
  //has history object in components that are inside Route
  //if it doesn't have it, you must use withRouter
  titleClikedHandle() {
    console.log('Title is clicked');
    console.log(this.props.login);
    // axios.get('/');
    this.props.history.push("/");
  }

  getConfirmation() {
    console.log('go to this route based on confirmation');

  }

  //Login will change the state logged to true.
  //also will pass the username?

  render () {
    console.log(this.props.login);
    return (
      <Paper>
     
          <div>
            <AppBar
              title="DEMO Movie DB"
              showMenuIconButton={false}
              iconElementRight={this.props.login ? <Menu /> : <RaisedButton label="LogIn" style={{margin: '20px'}} href="/login"  /> }
              onTitleTouchTap={this.titleClikedHandle.bind(this)}
            />
            
            <hr/>

            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              
              <Route path="/settings" render={props=> this.props.login ? <Settings/> : <Redirect to={"/"} />} />
              <Route path="/saved" render={props=> this.props.login ? <SavedSearches /> : <Redirect to={"/"} />} /> 
              <Route path="/financial" render={props=> this.props.login ? <Financials/> : <Redirect to={"/"}/>} /> 

              <Route exact path="/" render={props=> <Home logged={this.props.login}/>}/>
            </Switch>

          </div>
      </Paper>
    );
  }
}



function mapStateToProps({ login }) {
  return { login };
}


export default withRouter(connect(mapStateToProps)(App));



