import { API_BASE_URL } from "./consts";

export const getMovies = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/GetMovies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  return data;
};
