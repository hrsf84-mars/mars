import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';
import Financials from '../containers/Financials';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Settings from './loggedin/settings.jsx';
import SavedSearches from './loggedin/saved.jsx';
import LoggedInHomePage from './loggedin/loggedinhome.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



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
              <Link to="/settings">Test Click Here</Link>
              <Link to="/">Home</Link>
              <MenuItem primaryText="Home Test" />
              <MenuItem primaryText="Settings Page" containerElement={<Link to="/settings" />}/>
              <MenuItem primaryText="Saved Searches" containerElement={<Link to="/saved" />}/>
              <MenuItem primaryText="LogIn" containerElement={<Link to="/loggedinhome" />}/>
            </IconMenu>
          </AppBar>
          <hr/>
          <Route exact path="/" component={Core}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/saved" component={SavedSearches}/> 
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
          <SearchBox />
          <MovieDetail />
      </Paper>
    );
  }
}



export default App;


