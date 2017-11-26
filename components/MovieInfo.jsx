import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
          <TableRowColumn>{primaryMovie.revenue}</TableRowColumn>
          {secondaryTitle && <TableRowColumn>{secondaryMovie.revenue}</TableRowColumn>}
        </TableRow>
        <TableRow>
          <TableRowColumn>Release Date</TableRowColumn>
          <TableRowColumn>{primaryMovie.releaseDate}</TableRowColumn>
          {secondaryTitle && <TableRowColumn>{secondaryMovie.releaseDate}</TableRowColumn>}
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
