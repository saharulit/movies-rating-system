import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import { mockLogin } from './services/__mocks__/login';
import { mockGetMovies } from './services/__mocks__/movie';

vi.mock('./services/login.ts');
vi.mock('./services/movie.ts');

describe('App', () => {
  it('should call the login service', async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });
  it('Should call get movie', async () => {
    render(<App />);
    await waitFor(() => {
      expect(mockGetMovies).toHaveBeenCalledWith({token:'mock_token'});
      expect(screen.findByText('Action movie'))
    });
  });
});
