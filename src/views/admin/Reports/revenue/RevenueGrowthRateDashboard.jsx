// Import necessary libraries
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Helper function to calculate monthly growth rate
const calculateMonthlyGrowthRate = (data) => {
  return data.map((current, index, array) => {
    if (index === 0) return { ...current, growthRate: 0 }; // No growth rate for the first month
    const previous = array[index - 1];
    const growthRate = ((current.amount - previous.amount) / previous.amount) * 100;
    return { ...current, growthRate };
  });
};

// Main component
export default function RevenueGrowthRateDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5062/api/RevenueReport');
        const formattedData = formatData(response.data);
        const growthData = calculateMonthlyGrowthRate(formattedData);
        setData(growthData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  // Format data into monthly intervals
  const formatData = (revenueData) => {
    const monthlyData = revenueData.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, amount: 0 };
      }
      acc[monthYear].amount += curr.amount;
      return acc;
    }, {});

    return Object.values(monthlyData);
  };

  return (
    <div className="h-[34rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium mb-4">Revenue Growth Rate</strong>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 20, left: -2, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Revenue" yAxisId="left" />
            <Line type="monotone" dataKey="growthRate" stroke="#82ca9d" name="Growth Rate (%)" yAxisId="right" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
