import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';
import Financials from '../containers/Financials';
import Settings from './loggedin/settings.jsx';
import SavedSearches from './loggedin/saved.jsx';
import LogInPage from './loginpage.jsx';
import LoggedInHomePage from './loggedin/loggedinhome.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';



var App = () => {
  return (
    <Paper>
      <Router>
        <div>
          <AppBar
            title="DEMI Movie DB"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          > 
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
              <MenuItem primaryText="Home" containerElement={<Link to="/" />}/>
              <MenuItem primaryText="Log In Page" containerElement={<Link to="/login-page" />}/>
              <MenuItem primaryText="Financials / ROI" containerElement={<Link to="/financial" />}/>
              <MenuItem primaryText="Settings Page" containerElement={<Link to="/settings" />}/>
              <MenuItem primaryText="Saved Searches" containerElement={<Link to="/saved" />}/>
              <MenuItem primaryText="LogIn TEMP" containerElement={<Link to="/loggedinhome" />}/>
            </IconMenu>
          </AppBar>
          <hr/>
          <Route exact path="/" component={Core}/>
          <Route path="/financial" component={Financials}/> 
          <Route path="/settings" component={Settings}/>
          <Route path="/saved" component={SavedSearches}/> 
          <Route path="/login-page" component={LogInPage}/>
          <Route path="/loggedinhome" component={LoggedInHomePage}/>    
        </div>
      </Router>
    </Paper>
  );
}



class Core extends React.Component {
  constructor() {
    super();
  }

  onMenuClicked() {
    console.log('clicked');
    //have a state for each of the menu items
    //change the state
  }

  render() {
    return (
      <Paper>
          <RaisedButton label="LOG IN" containerElement={<Link to="/login-page" />}/>
          <SearchBox />
          <MovieDetail />
          <Financials />
      </Paper>
    );
  }
}



export default App;


