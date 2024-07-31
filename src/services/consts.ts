import { Movie } from '../types';
import { TableColumn } from 'react-data-table-component';

export const API_BASE_URL = 'http://62.90.222.249:10001/api/admin';
export const TABLE_COLUMNS: TableColumn<Movie>[] = [
  {
    name: 'Movie ID',
    selector: (row: Movie) => row.id, // Convert number to string
    sortable: true,
  },
  {
    name: 'Movie description',
    selector: (row: Movie) => row.description,
    sortable: true,
  },
  {
    name: 'Total votes',
    selector: (row: Movie) => row.totalVotes, // Convert number to string
    sortable: true,
  },
  {
    name: 'Last updated time',
    selector: (row: Movie) => row.lastUpdated,
    sortable: true,
  },
  // {
  //   name: 'Icon column',
  //   selector: (row: Movie) => row.positionChange,
  //   sortable: true,
  // },
];
