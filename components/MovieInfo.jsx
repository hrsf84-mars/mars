import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { List, ListItem } from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { yellow100, yellow500, red100, red500 } from 'material-ui/styles/colors';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import moment from 'moment';
import Emotion from './Emotion';

const translateToCurrency = (value) => {
  let num = value;
  let commaCounter = 0;
  let res = '';
  while (num > 0) {
    const dig = num % 10;

    commaCounter += 1;
    if (commaCounter > 3) {
      res = `,${res}`;
      commaCounter %= 3;
    }
    res = dig + res;

    num = Math.floor(num / 10);
  }
  return `$${res}`;
};

function MovieInfo({ primaryMovie, secondaryMovie }) {
  const primaryTitle = primaryMovie.title;
  const secondaryTitle = secondaryMovie.title;
  return (
    <Table fixedHeader>
      <TableHeader
        adjustForCheckbox={false}
        displaySelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn>Movie Info</TableHeaderColumn>
          <TableHeaderColumn>{primaryTitle}</TableHeaderColumn>
          {secondaryTitle && <TableHeaderColumn>{secondaryTitle}</TableHeaderColumn>}
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover
      >
        <TableRow>
          <TableRowColumn>Revenue</TableRowColumn>
          <TableRowColumn>
            {primaryMovie.revenue &&
            <Chip backgroundColor={yellow100}>
              <Avatar icon={<EditorAttachMoney />} color={yellow100} backgroundColor={yellow500} />
              {translateToCurrency(primaryMovie.revenue)}
            </Chip>}
          </TableRowColumn>
          {secondaryTitle &&
          <TableRowColumn>
            <Chip backgroundColor={yellow100}>
              <Avatar icon={<EditorAttachMoney />} color={yellow100} backgroundColor={yellow500} />
              {translateToCurrency(secondaryMovie.revenue)}
            </Chip>
          </TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Release Date</TableRowColumn>
          <TableRowColumn>
            {primaryMovie.releaseDate &&
            <Chip backgroundColor={red100}>
              <Avatar icon={<ActionSchedule />} color={red100} backgroundColor={red500} />
              {moment(primaryMovie.releaseDate).format('MMMM Do YYYY')}
            </Chip>}
          </TableRowColumn>
          {secondaryTitle &&
          <TableRowColumn>
            <Chip backgroundColor={red100}>
              <Avatar icon={<ActionSchedule />} color={red100} backgroundColor={red500} />
              {moment(secondaryMovie.releaseDate).format('MMMM Do YYYY')}
            </Chip>
          </TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Reaction</TableRowColumn>
          <TableRowColumn>
            {primaryMovie.emotion && <Emotion emotion={primaryMovie.emotion} />}
          </TableRowColumn>
          {secondaryTitle &&
          <TableRowColumn>
            {secondaryMovie.emotion && <Emotion emotion={secondaryMovie.emotion} />}
          </TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Genres</TableRowColumn>
          <TableRowColumn>
            <List>
              {primaryMovie.genres &&
              primaryMovie.genres.map(g => <ListItem key={g} primaryText={g} />)}
            </List>
          </TableRowColumn>
          {secondaryTitle &&
          <TableRowColumn>
            <List>
              {secondaryMovie.genres.map(g => <ListItem key={g} primaryText={g} />)}
            </List>
          </TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Production Companies</TableRowColumn>
          <TableRowColumn>
            <List>
              {primaryMovie.productionCompanies &&
              primaryMovie.productionCompanies.map(pc => <ListItem key={pc} primaryText={pc} />)}
            </List>
          </TableRowColumn>
          {secondaryTitle &&
          <TableRowColumn>
            <List>
              {secondaryMovie.productionCompanies.map(pc => <ListItem key={pc} primaryText={pc} />)}
            </List>
          </TableRowColumn>}
        </TableRow>
      </TableBody>
    </Table>
  );
}

MovieInfo.propTypes = {
  primaryMovie: PropTypes.shape({
    title: PropTypes.string,
    revenue: PropTypes.number,
    releaseDate: PropTypes.string,
    emotion: PropTypes.shape({}),
    genres: PropTypes.arrayOf(PropTypes.string),
    productionCompanies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  secondaryMovie: PropTypes.shape({
    title: PropTypes.string,
    revenue: PropTypes.number,
    releaseDate: PropTypes.string,
    emotion: PropTypes.shape({}),
    genres: PropTypes.arrayOf(PropTypes.string),
    productionCompanies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default MovieInfo;
