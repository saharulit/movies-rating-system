import React from 'react';
import { Chart } from 'react-google-charts';
import { Vote } from '../services/singleR';
import { format } from 'date-fns';

interface MovieChartProps {
  votes: Vote[];
}

const MovieChart: React.FC<MovieChartProps> = ({ votes }) => {
  const data = [
    ['Time', 'Votes'],
    ...votes.map((vote) => [format(new Date(), 'HH:mm:ss'), vote.itemCount]),
  ];

  const options = {
    title: 'Votes Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Votes',
    },
  };

  return (
    <div>
      {votes.length > 0 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      ) : (
        'Please select movie to display vote chart'
      )}
    </div>
  );
};

export default MovieChart;
