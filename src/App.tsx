import React, { useEffect, useState } from 'react';
import signalRService, { Vote } from './services/singleR';
import loginService from './services/login';
import movieService from './services/movie';
import Header from './components/Header';
import { ConnectionStatus } from './types';
import { format, parseISO } from 'date-fns';
import SearchBar from './components/SearchBar';
import MovieTable from './components/MovieTable';

interface MovieVote {
  id: number;
  description: string;
  totalVotes: number;
  lastUpdated: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieVote[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.Disconnected
  );
  const [lastReceivedTime, setLastReceiveTime] = useState<Date | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await loginService.login();
        const moviesList = await movieService.getMovies(token);

        setMovies(
          moviesList.map((movie) => ({
            id: movie.id,
            description: movie.description,
            totalVotes: 0,
            lastUpdated: '',
          }))
        );

        await signalRService.startConnection(token, handleVotesReceived);
        setConnectionStatus(ConnectionStatus.Connected);
      } catch (error) {
        console.error('Initialization error:', error);
        setConnectionStatus(ConnectionStatus.Disconnected);
      }
    };

    initialize();

    return () => {
      signalRService.stopConnection();
    };
  }, []);

  const handleVotesReceived = (votes: Vote[]) => {
    console.log('handleVotesReceived');
    setLastReceiveTime(new Date());

    setMovies((prevMovies) =>
      prevMovies.map((movie) => {
        const vote = votes.find((v) => v.itemId === movie.id);
        if (vote) {
          return {
            ...movie,
            totalVotes: movie.totalVotes + vote.itemCount,
            lastUpdated: format(
              parseISO(vote.generatedTime),
              'dd/MM/yyyy HH:mm:ss'
            ),
          };
        }
        return movie;
      })
    );
  };

  const handleSearch = (query: string) => {
    query
      ? setMovies(
          movies.filter((movie) =>
            movie.description.toLowerCase().includes(query.toLowerCase())
          )
        )
      : setMovies(movies);
  };

  return (
    <div>
      <Header
        lastReceivedTime={lastReceivedTime}
        connectionStatus={connectionStatus}
      />
      <SearchBar onSearch={handleSearch} />
      <MovieTable movies={movies} />
    </div>
  );
};

export default App;
