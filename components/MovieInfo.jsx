import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import moment from 'moment';

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

export default ({ primaryMovie, secondaryMovie }) => {
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
            {primaryMovie.revenue && translateToCurrency(primaryMovie.revenue)}
          </TableRowColumn>
          {secondaryTitle &&
          <TableRowColumn>{translateToCurrency(secondaryMovie.revenue)}</TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Release Date</TableRowColumn>
          <TableRowColumn>
            {primaryMovie.releaseDate && moment(primaryMovie.releaseDate).format('MMMM Do YYYY')}
          </TableRowColumn>
          {secondaryTitle &&
          <TableRowColumn>{moment(secondaryMovie.releaseDate).format('MMMM Do YYYY')}</TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Genres</TableRowColumn>
          <TableRowColumn>{primaryMovie.genres}</TableRowColumn>
          {secondaryTitle && <TableRowColumn>{secondaryMovie.genres}</TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Production Companies</TableRowColumn>
          <TableRowColumn>{primaryMovie.productionCompanies}</TableRowColumn>
          {secondaryTitle && <TableRowColumn>{secondaryMovie.productionCompanies}</TableRowColumn>}
        </TableRow>
      </TableBody>
    </Table>
  );
};
