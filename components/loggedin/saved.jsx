import React from 'react';
import Chip from 'material-ui/Chip';


var handleRequestDelete = function() {
	console.log('when the chip gets deleted');
}

var handleTouchTap = function() {
	console.log('when the chip gets clicked on');
}

var styles ={
	color: 'red'
}
//probably need to make this into a class later and add the above functions
//if have time, make it so that when user clicks on picture it just searches for that.
var SavedSearches = (props) => (
  
  <div>
    <h1>
      Saved Movies
    </h1>
    <div>
	    <Chip
		      onRequestDelete={handleRequestDelete}
		      onClick={handleTouchTap}
		      style={{padding: '10px'}}
		      labelStyle={{fontSize: '15px'}}

		    >
		      <span>Compare: Movie1 | Movie2</span>  
		</Chip>
    </div>
  </div>
);





export default SavedSearches;