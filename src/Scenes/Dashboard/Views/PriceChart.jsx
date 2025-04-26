import React from 'react';
import { Line } from 'react-chartjs-2';

const PriceChart = ({ timeRange, handleTimeRangeChange, priceHistory }) => {
  const timeRanges = ['24h', '7d', '1m', '6m', '1a'];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `R$ ${value.toLocaleString('pt-BR')}`,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-5">
      <div className="flex items-center mb-10">
        <h2 className="text-lg font-semibold mr-5">Histórico de Preço</h2>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`px-2 py-1 text-xs rounded-md ${
                timeRange === range 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleTimeRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-100">
        <Line data={priceHistory} options={chartOptions} />
      </div>
    </div>
  );
};

export default PriceChart;
