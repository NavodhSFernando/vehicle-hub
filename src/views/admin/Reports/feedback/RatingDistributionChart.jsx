import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import 'canvas-toBlob';

export default function RatingDistributionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5062/api/FeedbackReport');
        const formattedData = formatChartData(response.data);
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const formatChartData = (feedbackData) => {
    const ratingCounts = feedbackData.reduce((acc, feedback) => {
      const rating = feedback.rating;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(ratingCounts).map((key) => ({
      rating: `${key} Star${key > 1 ? 's' : ''}`,
      count: ratingCounts[key]
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA62EA'];

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white border p-2">
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-[34rem] bg-white p-4 rounded-sm border mb-8 border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium mb-2" style={{ fontWeight: 800 }}>Rating Distribution</strong>
      <div className="mt-3 w-full flex-1 text-xs" id="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="rating"
              cx="50%"
              cy="50%"
              outerRadius={160}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}