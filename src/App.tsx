import React, { useEffect, useState } from 'react';
import signalRService from './services/singleR';
import loginService from './services/login';
import movieService from './services/movie';
import Header from './components/Header';
import { ConnectionStatus, MovieVote } from './types';
import SearchBar from './components/SearchBar';
import MovieTable from './components/MovieTable';
import { handleVotesReceived } from './util';

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieVote[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.Disconnected
  );
  const [lastReceivedTime, setLastReceiveTime] = useState<Date | null>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const login = async () => {
      try {
        const loginToke = await loginService.login();
        setToken(loginToke);
      } catch (error) {
        console.error('Login error: ', error);
      }
    };
    login();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesList = await movieService.getMovies(token);
        const updatedMovies = moviesList.map((movie) => ({
          id: movie.id,
          description: movie.description,
          totalVotes: 0,
          lastUpdated: '',
        }));
        setMovies(updatedMovies);
      } catch (error) {
        console.log('getMovies error: ', error);
      }
    };
    getMovies();
  }, [token]);

  useEffect(() => {
    if (movies.length > 0) {
      try {
        signalRService.startConnection(token, (votes) => {
          setMovies((prevMovies) => {
            const updatedMovies = handleVotesReceived(votes, prevMovies);
            return updatedMovies;
          });
          setConnectionStatus(ConnectionStatus.Connected);
          setLastReceiveTime(new Date());
        });
      } catch (error) {
        console.error('signalRService error: ', error);
        setConnectionStatus(ConnectionStatus.Disconnected);
      }

      return () => {
        signalRService.stopConnection();
      };
    }
  }, [movies, token]);

  const handleSearch = (query: string) => {
    query
      ? setMovies(
          movies.filter((movie) =>
            movie.description.toLowerCase().includes(query.toLowerCase())
          )
        )
      : setMovies(movies);
  };

  const handleSelectMovie = (rowData: MovieVote) => {
    console.log(rowData);
  };

  return (
    <div>
      <Header
        lastReceivedTime={lastReceivedTime}
        connectionStatus={connectionStatus}
      />
      <SearchBar onSearch={handleSearch} />
      <MovieTable movies={movies} onMovieSelect={handleSelectMovie} />
    </div>
  );
};

export default App;
