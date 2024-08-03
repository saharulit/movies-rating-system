import { Movie } from "../movie";

export const mockMovies:Movie[] = [
  {
    id: 1,
    description: 'Action movie'
  },
  {
    id: 2,
    description: 'Drama movie'
  }
]

export const mockGetMovies = vi.fn().mockResolvedValue({ mockMovies });

const movieService = {
  getMovies: mockGetMovies,
};

export default movieService;
