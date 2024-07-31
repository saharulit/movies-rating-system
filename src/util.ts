import { format } from 'date-fns';
import { IconDirection, MovieVote } from './types';
import { Vote } from './services/singleR';

export const handleVotesReceived = (
  votes: Vote[],
  prevMovies: MovieVote[]
): MovieVote[] => {
  const votesMap = new Map<number, number>();
  votes.forEach((vote) => {
    votesMap.set(
      vote.itemId,
      (votesMap.get(vote.itemId) || 0) + vote.itemCount
    );
  });

  const updatedMovies = prevMovies.map((movie) => {
    const newVotes = votesMap.get(movie.id) || movie.totalVotes;
    const hasNewVotes = newVotes !== movie.totalVotes;

    return {
      ...movie,
      totalVotes: newVotes + movie.totalVotes,
      lastUpdated: hasNewVotes
        ? format(new Date(), 'dd/MM/yyyy HH:mm:ss')
        : movie.lastUpdated,
    };
  });

  const sortedMovies = [...updatedMovies].sort(
    (a, b) => b.totalVotes - a.totalVotes
  );

  const finalMovies = updatedMovies.map((movie) => {
    const currentPosition = sortedMovies.findIndex((m) => m.id === movie.id);
    const previousPosition = prevMovies.findIndex((m) => m.id === movie.id);

    const previousRank =
      previousPosition === -1 ? sortedMovies.length : previousPosition;

    if (currentPosition === -1) {
      return movie; // movie is not in prev array
    }

    if (currentPosition < previousRank) {
      return { ...movie, direction: IconDirection.Up };
    } else if (currentPosition > previousRank) {
      return { ...movie, direction: IconDirection.Down };
    } else {
      return { ...movie, direction: IconDirection.Remains };
    }
  });

  return finalMovies;
};
