import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { MovieVote } from '../types';
import IconCol from './IconCol';
interface MovieVoteProps {
  movies: MovieVote[];
  onMovieSelect: (row: MovieVote) => void;
}

const MovieTable: React.FC<MovieVoteProps> = ({ movies, onMovieSelect }) => {
  const columns: TableColumn<MovieVote>[] = [
    {
      name: 'Movie ID',
      selector: (row: MovieVote) => row.id,
      sortable: true,
    },
    {
      name: 'Movie description',
      selector: (row: MovieVote) => row.description,
      sortable: true,
    },
    {
      name: 'Total votes',
      selector: (row: MovieVote) => row.totalVotes,
      sortable: true,
    },
    {
      name: 'Last updated time',
      selector: (row: MovieVote) => row.lastUpdated,
      sortable: true,
    },
    {
      name: 'Icon',
      cell: (row: MovieVote) => <IconCol direction={row.direction} />,
    },
  ];

  return (
    <DataTable
      title="Movie List"
      columns={columns}
      data={movies}
      pagination
      onRowClicked={onMovieSelect}
    />
  );
};

export default MovieTable;
