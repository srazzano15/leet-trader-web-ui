import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { LineChartProps } from './types';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



// The LineChart component
const LineChart: React.FC<LineChartProps> = ({ chartData }) => {
  // Chart options (optional)
  const options: ChartOptions<'line'> = {
    responsive: true,
    aspectRatio: 4,
    layout: {
        padding: 0
    },
    plugins: {
    },
  };

  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
};

export default LineChart;