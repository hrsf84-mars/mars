import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

const Menu = (props) => (
  <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
    <p>Username Goes here</p>
    <MenuItem primaryText="Home" containerElement={<Link to="/" />}/>
    <MenuItem primaryText="Settings" containerElement={<Link to="/settings" />}/>
    <MenuItem primaryText="Saved" containerElement={<Link to="/saved" />}/>
    <MenuItem primaryText="LogOut" containerElement={<Link to="/" />}/>
  </IconMenu>
);

export default Menu;