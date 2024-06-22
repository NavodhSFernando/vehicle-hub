import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

export default function UsageDurationChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5062/api/VehicleUtilizationReport');
        const formattedData = formatChartData(response.data);
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const formatChartData = (vehicleData) => {
    const durationData = vehicleData.map(item => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const durationHours = (endDate - startDate) / (1000 * 60 * 60); // Duration in hours

      return {
        vehicleNo: item.vehicleNo,
        duration: durationHours
      };
    });

    // Aggregate duration per vehicle
    const aggregatedData = durationData.reduce((acc, curr) => {
      const vehicle = acc.find(v => v.vehicleNo === curr.vehicleNo);
      if (vehicle) {
        vehicle.duration += curr.duration;
      } else {
        acc.push({ vehicleNo: curr.vehicleNo, duration: curr.duration });
      }
      return acc;
    }, []);

    return aggregatedData;
  };

  const downloadChart = () => {
    const chartNode = document.getElementById('chart-container');

    if (!chartNode) {
      console.error('Chart container not found.');
      return;
    }

    html2canvas(chartNode).then(canvas => {
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'usage_duration_chart.png'; // File name
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  };

  return (
    <div className="h-[34rem] bg-white p-4 rounded-sm border mb-8 border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Usage Duration per Vehicle</strong>
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
            <XAxis dataKey="vehicleNo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#82ca9d" name="Duration (Hours)" />
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

