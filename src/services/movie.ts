import { API_BASE_URL } from './consts';

export interface Movie {
  id: number;
  description: string;
}
export class MovieService {
  private readonly API_URL = `${API_BASE_URL}/api/admin`;
  private readonly MOVIE_URL = `${this.API_URL}/GetMovies`;

  async getMovies(token: string): Promise<Movie[]> {
    const response = await fetch(this.MOVIE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
  }
}

export default new MovieService();
