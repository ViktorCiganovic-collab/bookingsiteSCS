import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuarterlyChart = () => {
  const [chartData, setChartData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://scservices.se/api/booking/statistics/quarterly',       {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
      .then(res => {
        const raw = res.data;
        console.log('API response:', res.data);

        // Sortera och gruppera per år
        const grouped = raw.reduce((acc, item) => {
          const label = `Q${item.quarter} ${item.year}`;
          acc.labels.push(label);
          acc.data.push(item.bookingCount);
          return acc;
        }, { labels: [], data: [] });

        setChartData({
          labels: grouped.labels,
          datasets: [{
            label: 'Bokningar per kvartal',
            data: grouped.data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }]
        });
      });
  }, []);

  return chartData ? (
  <Bar
  data={chartData}
  options={{
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Kvartalsvis bokningsstatistik' }
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', // ← färg på X-axelns etiketter
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        ticks: {
          color: '#fff', // ← färg på Y-axelns siffror
          font: {
            size: 14
          }
        }
      }
    }
  }}
/>

  ) : <p>Laddar statistik...</p>;
};

export default QuarterlyChart;
