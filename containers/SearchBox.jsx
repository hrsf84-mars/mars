import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import { cyan100 } from 'material-ui/styles/colors';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { fetchMovie1, fetchMovie2 } from '../actions/MovieAction';
import { Player } from 'video-react';
import YouTube from 'react-youtube'


class SearchBox extends Component {
  constructor() {
    super();

    this.state = {
      primaryMovieList: [],
      secondaryMovieList: [],
      showTrailer: false,
      video: "",
      videoImage: "",
      nowPlaying:""
    };

    this.style = {
      padding: '25px',
    };

    this.imgUrl = 'https://image.tmdb.org/t/p/w92';
    this.chipColor = cyan100;

    this.onMovieSearch = this.onMovieSearch.bind(this);
    this.fetchPrimaryMovie = this.fetchPrimaryMovie.bind(this);
    this.fetchSecondaryMovie = this.fetchSecondaryMovie.bind(this);
  }

  onMovieSearch(query, type) {
    axios.get(`/search/${query}`)
      .then((response) => {
        if (type === 'primary') this.setState({ primaryMovieList: response.data.results });
        else if (type === 'secondary') this.setState({ secondaryMovieList: response.data.results });
      })
      .catch(err => console.error(err));
  }

  fetchPrimaryMovie(id) {
    this.setState({ primaryMovieList: [] });
    this.props.fetchMovie1(id);
  }

  fetchSecondaryMovie(id) {
    this.setState({ secondaryMovieList: [] });
    this.props.fetchMovie2(id);
  }

  clickHandler(search, date) {
    console.log(search);

    axios.get('/vid', {params: {query: search + " " + date}}).then((video) => {
      console.log(video.data.id.videoId);
      this.setState({
        showTrailer: true,
        videoImage: video.data.snippet.thumbnails.high.url,
        video: video.data.id.videoId,
        nowPlaying: search
      });
    })
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  showDiv() {
    this.setState({showTrailer: false})
  }

  render() {
    const hasPrimaryMovieList = this.state.primaryMovieList.length > 0;
    const hasSecondaryMovieList = this.state.secondaryMovieList.length > 0;
    const { primaryMovie, secondaryMovie } = this.props;
    let showTrailer = this.state.showTrailer;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
        }
    }
    return (
      <Paper zDepth={2} style={this.style}>
        {showTrailer &&
          <div className="video-player-div">
            <button className="vidButton" onClick={this.showDiv.bind(this)}>Close</button>
            <h5>{this.state.nowPlaying}</h5>
            <YouTube
              videoId={this.state.video}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
        }
        <SearchBar
          onMovieSearch={this.onMovieSearch}
          floatingLabelText="Search Primary Movie"
          type="primary"
        />
        {hasPrimaryMovieList &&
        <MovieList
          movies={this.state.primaryMovieList}
          fetchMovie={this.fetchPrimaryMovie}
        />}
        {!hasPrimaryMovieList && primaryMovie.title &&
        <Chip style={{ margin: 'auto' }} backgroundColor={this.chipColor} onClick={this.clickHandler.bind(this, primaryMovie.title, primaryMovie.releaseDate.split("T")[0])}>
          <Avatar src={this.imgUrl + primaryMovie.images[0]} />
          {primaryMovie.title}
        </Chip>}
        {primaryMovie.title &&
        <SearchBar
          onMovieSearch={this.onMovieSearch}
          floatingLabelText="Search Secondary Movie"
          type="secondary"
        />}
        {hasSecondaryMovieList &&
        <MovieList
          movies={this.state.secondaryMovieList}
          fetchMovie={this.fetchSecondaryMovie}
        />}
        {!hasSecondaryMovieList && secondaryMovie.title &&
        <Chip style={{ margin: 'auto' }} backgroundColor={this.chipColor} onClick={this.clickHandler.bind(this, secondaryMovie.title, secondaryMovie.releaseDate.split("T")[0])}>
          <Avatar src={this.imgUrl + secondaryMovie.images[0]} />
          {secondaryMovie.title}
        </Chip>}
      </Paper>
    );
  }
}

SearchBox.propTypes = {
  fetchMovie1: PropTypes.func.isRequired,
  fetchMovie2: PropTypes.func.isRequired,
  primaryMovie: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  secondaryMovie: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

function mapStateToProps({ primaryMovie, secondaryMovie }) {
  return { primaryMovie, secondaryMovie };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMovie1, fetchMovie2 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);




            // <Player
            //   style={{height:'50%', width:'50%'}}
            //   playsInline
            //   poster={this.state.videoImage}
            //   url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            // />
