import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import SocialJoy from 'material-ui/svg-icons/social/mood';
import SocialSad from 'material-ui/svg-icons/social/mood-bad';
import { lightGreen400, deepOrange900 } from 'material-ui/styles/colors';

class Emotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      anchorEl: null,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(e) {
    e.preventDefault();

    this.setState({
      isOpen: true,
      anchorEl: e.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { emotion } = this.props;
    const sadness = emotion.sadness * 100;
    const joy = emotion.joy * 100;
    const fear = emotion.fear * 100;
    const disgust = emotion.disgust * 100;
    const anger = emotion.anger * 100;
    const isHappy = joy >= sadness &&
      joy >= fear &&
      joy >= disgust &&
      joy >= anger;
    const emotions = Object.entries(emotion);

    return (
      <div>
        <FlatButton
          onClick={this.handleTouchTap}
          icon={isHappy ? <SocialJoy color={lightGreen400} /> : <SocialSad color={deepOrange900} />}
        />
        <Popover
          open={this.state.isOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {emotions.map(emos => (
              <MenuItem key={emos[0]} primaryText={`${emos[0]}: ${Number((emos[1] * 100).toFixed(2))}`} />
            ))}
          </Menu>
        </Popover>
      </div>
    );
  }
}

Emotion.propTypes = {
  emotion: PropTypes.shape({
    sadness: PropTypes.number,
    joy: PropTypes.number,
    fear: PropTypes.number,
    disgust: PropTypes.number,
    anger: PropTypes.number,
  }).isRequired,
};

export default Emotion;
