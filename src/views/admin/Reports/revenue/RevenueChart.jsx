import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import 'canvas-toBlob';

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5062/api/RevenueReport');
        const formattedData = formatChartData(response.data);
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const downloadChart = () => {
    const chartNode = document.getElementById('chart-container');

    if (!chartNode) {
      console.error('Chart container not found.');
      return;
    }

    html2canvas(chartNode).then(function (canvas) {
      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chart.png'; // File name
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  };

  const formatChartData = (revenueData) => {
    const monthlyData = revenueData.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, deposit: 0, final: 0 };
      }

      if (curr.type === 'Deposit') {
        acc[monthYear].deposit += curr.amount;
      } else if (curr.type === 'Final') {
        acc[monthYear].final += curr.amount;
      }

      return acc;
    }, {});

    return Object.values(monthlyData);
  };

  return (
    <div className="h-[34rem] bg-white p-4 rounded-sm border mb-8 border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Monthly Revenue</strong>
      <div className="mt-3 w-full flex-1 text-xs" id="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="deposit" fill="#0ea5e9" name="Deposit" />
            <Bar dataKey="final" fill="#ef4444" name="Final" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <button
        onClick={downloadChart}
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download Chart
      </button> */}
    </div>
  );
}
