import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function MonthlyRevenueComparisonTable() {
  const [data, setData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5062/api/RevenueReport');
        setData(response.data);
        const formattedData = formatComparisonData(response.data);
        setComparisonData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const formatComparisonData = (revenueData) => {
    // Group data by year and month
    const monthlyData = revenueData.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'short' });
      const yearMonth = `${year}-${month}`;

      if (!acc[yearMonth]) {
        acc[yearMonth] = { yearMonth, totalRevenue: 0, totalTransactions: 0 };
      }

      acc[yearMonth].totalRevenue += curr.amount;
      acc[yearMonth].totalTransactions += 1;

      return acc;
    }, {});

    // Convert object to array and calculate average transaction amount
    return Object.values(monthlyData).map(entry => ({
      yearMonth: entry.yearMonth,
      totalRevenue: entry.totalRevenue,
      avgTransactionAmount: entry.totalRevenue / entry.totalTransactions
    }));
  };

  return (
    <div className="p-4 bg-white rounded-sm border mb-8 border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium mb-3">Monthly Revenue Comparison Table</strong>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 font-medium">Month</th>
              <th className="py-2 px-4 border-b border-gray-200 font-medium">Total Revenue</th>
              <th className="py-2 px-4 border-b border-gray-200 font-medium">Average Transaction Amount</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{row.yearMonth}</td>
                <td className="py-2 px-4 border-b border-gray-200">Rs {row.totalRevenue.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-200">Rs {row.avgTransactionAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
