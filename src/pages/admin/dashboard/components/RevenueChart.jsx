import { Card, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { analyticsService } from '../../../../services/analytics.service';

// Đăng ký các component cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const groupByOptions = [
  { value: 'DAILY', label: 'Theo ngày' },
  { value: 'WEEKLY', label: 'Theo tuần' },
  { value: 'MONTHLY', label: 'Theo tháng' },
  { value: 'QUARTERLY', label: 'Theo quý' },
  { value: 'YEARLY', label: 'Theo năm' }
];

function RevenueChart() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [groupBy, setGroupBy] = useState('MONTHLY');
  const currentYear = new Date().getFullYear();

  const formatDateLabel = (label) => {
    if (groupBy === 'DAILY') {
      try {
        // Check if label contains "Ngày" and extract the date
        if (label.includes('Ngày')) {
          const day = label.split(' ')[1];
          // Construct date string with current month and year
          const date = new Date(currentYear, new Date().getMonth(), parseInt(day));
          return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit'
          }).format(date);
        }
        // If label is already in YYYY-MM-DD format
        if (label.match(/^\d{4}-\d{2}-\d{2}$/)) {
          const date = new Date(label);
          return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit'
          }).format(date);
        }
        // Return original label if no format matches
        return label;
      } catch (error) {
        console.warn('Error formatting date label:', error);
        return label;
      }
    }
    return label;
  };

  useEffect(() => {
    fetchChartData();
  }, [groupBy]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getRevenueChart({
        year: currentYear,
        groupBy
      });
      const chartConfig = {
        labels: data.timeRanges.map(formatDateLabel),
        datasets: [
          {
            label: 'Doanh thu',
            data: data.revenues,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };

      setChartData(chartConfig);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Biểu đồ doanh thu ${currentYear}`
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              maximumFractionDigits: 0
            }).format(value);
          }
        }
      }
    }
  };

  return (
    <Card
      title="Thống kê doanh thu"
      extra={
        <Select
          value={groupBy}
          onChange={setGroupBy}
          options={groupByOptions}
          style={{ width: 150 }}
        />
      }
    >
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <Spin size="large" />
        </div>
      ) : (
        <div className="h-80">
          {chartData && <Line data={chartData} options={options} />}
        </div>
      )}
    </Card>
  );
}

export default RevenueChart; 