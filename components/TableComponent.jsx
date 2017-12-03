import React from 'react';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';
import { fetchMovie1, fetchMovie2 } from '../actions/MovieAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class TableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.imgUrl = 'https://image.tmdb.org/t/p/w92';
		//checkedObj keeps track of all the movies that are checked, so that we can delete them.
		this.state = {
			checkedObj: {},
			idCounter: 0
		}
	}

	rowClicked(result) {
		console.log('rowclicked ', );
		var indexOfClickedRow = result[0];
		var clickedMovieObj = this.props.movies[indexOfClickedRow];
		// clickedMovieObj.tmdbid;

		console.log('clicked obj: ', clickedMovieObj);

		//redirect the user to the home page
		
		//want to wait for the store to update first before redirecting.

		this.props.history.push("/");

		this.props.fetchMovie1(clickedMovieObj.tmdbid1);

		setTimeout(() => {
			this.props.fetchMovie2(clickedMovieObj.tmdbid2);
		}	, 1000);
		

		

		


	}

	checkboxClicked(e) {
		//store all the check
		console.log('target: ', e.target);
		e.stopPropagation();
		
		var clickedObj = JSON.parse(e.target.value);
		console.log('sclicked OBJECT :', clickedObj);
		if (e.target.checked) {
			this.state.checkedObj[clickedObj.id] = clickedObj;
			console.log('here is the stored check : ', this.state.checkedObj);
		} else {
			//user unchecked something that was checked

			//remove from checkedObj the object at index 
			delete this.state.checkedObj[clickedObj.id];
			console.log('here is the stored check delete: ', this.state.checkedObj);
		}
	}

	deleteClicked() {
		console.log('deleting these : ', this.state.checkedObj);
		axios.put('/deleteSaved', this.state.checkedObj).
		then((response) => {
			console.log('deleted successfull on client side');
			this.state.checkedObj = {};
			this.props.fetchSaved();
		});
	}

	render() {
		console.log('rerenders')
	  return (
	  	<div style={{padding: '20px'}}>
	     <Table
	     	onRowSelection={this.rowClicked.bind(this)}
	      fixedHeader={true}
	      fixedFooter={true}
	      multiSelectable={true}
	      style={{width: '50%', position: 'relative', left: '25%'}}
	      >

	      <TableHeader
	        displaySelectAll={false}
	        adjustForCheckbox={true}
	        enableSelectAll={true}>
	        <TableRow>
	          <TableHeaderColumn tooltip="The ID">Movie#1</TableHeaderColumn>
	          <TableHeaderColumn tooltip="The Name">Movie#2</TableHeaderColumn>
	        </TableRow>
	      </TableHeader>


	      <TableBody
	        displayRowCheckbox={false}
	        deselectOnClickaway={true}
	        showRowHover={false}
	        stripedRows={false}
	      >
	        {this.props.movies.map( (savedMovieObj, index) => (
	          <TableRow style={{cursor: 'pointer'}}>
	          	
		          	<TableRowColumn> 
		            	<input key={this.state.idCounter} type="checkbox" id={this.state.idCounter++} onClick={this.checkboxClicked.bind(this)} 
		            	value={JSON.stringify({id: this.state.idCounter - 1, username: this.props.user, firstMovie: savedMovieObj.firstMovie, secondMovie: savedMovieObj.secondMovie})}
		            	/>
		            </TableRowColumn>
		            <TableRowColumn >  	
		            	<Avatar src={this.imgUrl + savedMovieObj.image1} style={{margin: '10px'}}/>
		            	{savedMovieObj.firstMovie}
		            </TableRowColumn>

		            <TableRowColumn> 
		            	<Avatar src={this.imgUrl + savedMovieObj.image2} style={{margin: '10px'}}/>
		            	{savedMovieObj.secondMovie}
		            </TableRowColumn>
	          
	          </TableRow>
	          ))
	      	}
	      </TableBody>
	      <TableFooter>
	        <TableRow>
	          <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
	            
	          <i class="material-icons" onClick={this.deleteClicked.bind(this)}>delete</i>
	          </TableRowColumn>
	        </TableRow>
	      </TableFooter>


	    </Table>       
	    </div>
		)		
	}
}



// export default withRouter(TableComponent);


// function mapStateToProps({ savedMovies, username }) {
//   return { savedMovies, username };
// }

// function mapStateToProps({ financials, primaryMovie, secondaryMovie }) {
//   return { financials, primaryMovie, secondaryMovie };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMovie1, fetchMovie2 }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(TableComponent));

// function mapStateToProps({ savedMovies, username }) {
//   return { savedMovies, username };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchSavedMovies, fetchMovie1, fetchMovie2 }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SavedSearches);



// onRowSelection={this.rowSelectedHandler.bind(this)}
// <div style={{marginTop: '30px' ,width: '100%', height: '500px'}}>
// 			<ul style={{width: '50%', position: 'relative', left:'25%', listStyle: 'none', height: '100%'}}>
// 				{props.movies.map( (savedMovieObj, index) => (
//         <li style={{backgroundColor:"red", padding: '10px', margin: '2px'}}>
//         	<span style={{width: '20%', height: '100px',backgroundColor: 'blue'}}>
//           	<button></button>	
//           </span>
//         	<span style={{width: '80%', height: '100px', backgroundColor:'green'}}>
// 	        	<Avatar src={imgUrl + savedMovieObj.image1} style={{margin: '20px'}}/>
// 	          {savedMovieObj.firstMovie}

// 	          <Avatar src={imgUrl + savedMovieObj.image2} style={{margin: '20px'}}/>
// 	          	{savedMovieObj.secondMovie}
//           </span>

//         </li>
//         ))}
// 			</ul>
// 		</div>