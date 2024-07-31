import React from 'react';
import { Movie } from '../types';
import DataTable from 'react-data-table-component';
import { TABLE_COLUMNS } from '../services/consts';

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  return (
    <DataTable
      title="Movie List"
      columns={TABLE_COLUMNS}
      data={movies}
      pagination
    />
  );
};

export default MovieTable;
