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

const CertBookingChart = () => {
const [chartData, setChartData] = useState(null);
const token = localStorage.getItem('token');


useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get('https://certbe-backend.onrender.com/api/Cert/statistics/most_booked_certs', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const raw = res.data;
        console.log(res.data);
        const labels = raw.map(item => item.certName);
        const data = raw.map(item => item.numberofBookings);

        setChartData({
            labels,
            datasets: [{
                label: 'Bokningar per certifiering',
                data,
                backgroundColor: 'red'
            }]
        })

        } catch (error) {
            console.error('Fel vid hämtning av certifieringsdata:', error);
        }
    }; fetchData();
}, [token]);

 

  return chartData ? (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Totalt antal bokningar per certifiering' }
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
              font: { size: 12 }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff',
              font: { size: 12 }
            }
          }
        }
      }}
    />
  ) : <p>Laddar certifieringsstatistik...</p>;
}

export default CertBookingChart;