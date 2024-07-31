import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Movie } from '../services/movie';

interface MovieTable extends Movie {
  totalVotes: number;
  lastUpdated: string;
}
interface MovieTableProps {
  movies: MovieTable[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  const columns: TableColumn<MovieTable>[] = [
    {
      name: 'Movie ID',
      selector: (row: MovieTable) => row.id,
      sortable: true,
    },
    {
      name: 'Movie description',
      selector: (row: MovieTable) => row.description,
      sortable: true,
    },
    {
      name: 'Total votes',
      selector: (row: MovieTable) => row.totalVotes,
      sortable: true,
    },
    {
      name: 'Last updated time',
      selector: (row: MovieTable) => row.lastUpdated,
      sortable: true,
    },
  ];

  return (
    <DataTable title="Movie List" columns={columns} data={movies} pagination />
  );
};

export default MovieTable;
