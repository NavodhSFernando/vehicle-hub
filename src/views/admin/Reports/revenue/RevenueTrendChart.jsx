import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

export default function RevenueTrendChart() {
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

      // Find existing entry or create new one
      const existingEntry = acc.find(entry => entry.month === monthYear);
      if (existingEntry) {
        if (curr.type === 'Deposit') {
          existingEntry.deposit += curr.amount;
        } else if (curr.type === 'Final') {
          existingEntry.final += curr.amount;
        }
      } else {
        acc.push({
          month: monthYear,
          deposit: curr.type === 'Deposit' ? curr.amount : 0,
          final: curr.type === 'Final' ? curr.amount : 0
        });
      }

      return acc;
    }, []);

    return monthlyData;
  };

  return (
    <div className="h-[34rem] bg-white p-4 mb-10 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Revenue Trend Over Time</strong>
      <div className="mt-3 w-full flex-1 text-xs" id="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="deposit" stroke="#0ea5e9" name="Deposit" />
            <Line type="monotone" dataKey="final" stroke="#ef4444" name="Final" />
          </LineChart>
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
