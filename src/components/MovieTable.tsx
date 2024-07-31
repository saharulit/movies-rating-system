import React from 'react';
import { Movie } from '../types';
import DataTable from 'react-data-table-component';
import { TABLE_COLUMNS } from '../services/consts';

interface MovieTableProps {
  movies: Movie[];
  onMovieSelect: (movieId: number) => void;
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, onMovieSelect }) => {
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
