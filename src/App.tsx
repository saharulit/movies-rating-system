import React, { useEffect, useState } from 'react';
import signalRService, { Vote } from './services/singleR';
import loginService from './services/login';
import movieService from './services/movie';
import Header from './components/Header';
import { ConnectionStatus, IconDirection, MovieVote } from './types';
import { format, parseISO } from 'date-fns';
import SearchBar from './components/SearchBar';
import MovieTable from './components/MovieTable';

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
            direction: null,
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
    console.table(votes);

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
            direction:
              movie.totalVotes < vote.itemCount
                ? IconDirection.Up
                : IconDirection.Down,
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

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleTestButtonClick = () => {
    const testVotes: Vote[] = [];

    for (let i = 0; i < 5; i++) {
      testVotes.push({
        itemId: getRandomInt(1, 20),
        itemCount: getRandomInt(1, 50),
        generatedTime: new Date().toISOString(),
      });
    }

    handleVotesReceived(testVotes);
  };

  return (
    <div>
      <Header
        lastReceivedTime={lastReceivedTime}
        connectionStatus={connectionStatus}
      />
      <SearchBar onSearch={handleSearch} />
      <MovieTable movies={movies} />
      <button onClick={handleTestButtonClick}>
        Test Handle Votes Received
      </button>
    </div>
  );
};

export default App;
