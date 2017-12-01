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
import SavedSearches from './loggedin/saved.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: true
    }
  }

  //this.props.history.location
  //has history object in components that are inside Route
  //if it doesn't have it, you must use withRouter
  titleClikedHandle() {
    console.log('Title is clicked');
    this.props.history.push("/");
  }

  getConfirmation() {
    console.log('go to this route based on confirmation');

  }

  //Login will change the state logged to true.
  //also will pass the username?


  render () {
    return (
      <Paper>
     
          <div>
            <AppBar
              title="DEMO Movie DB"
              showMenuIconButton={false}
              iconElementRight={this.state.logged ? <Menu /> : <RaisedButton label="LogIn" style={{margin: '20px'}} containerElement={<Link to="/login" />} /> }
              onTitleTouchTap={this.titleClikedHandle.bind(this)}
            />
            <hr/>

            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              
              <Route path="/settings" render={props=> this.state.logged ? <Settings/> : <Redirect to={"/"} />} />
              <Route path="/saved" render={props=> this.state.logged ? <SavedSearches/> : <Redirect to={"/"} />} /> 
              <Route path="/financial" render={props=> this.state.logged ? <Financials/> : <Redirect to={"/"}/>} /> 

              <Route exact path="/" render={props=> <Home logged={this.state.logged}/>}/>
            </Switch>

          </div>
      </Paper>
    );
  }
}

export default withRouter(App);





