import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import html2canvas from 'html2canvas'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#F4D03F', '#EC7063']

export default function ReservationsChart() {
    const [data, setData] = useState([])
    const [view, setView] = useState('pie') // To switch between Pie and Bar chart views

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5062/api/VehicleUtilizationReport')
                const formattedData = formatChartData(response.data)
                setData(formattedData)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            }
        }
        fetchData()
    }, [])

    const formatChartData = (vehicleData) => {
        const reservationsData = vehicleData.reduce((acc, curr) => {
            const vehicle = acc.find((v) => v.vehicleNo === curr.vehicleNo)
            if (vehicle) {
                vehicle.reservations += 1
            } else {
                acc.push({ vehicleNo: curr.vehicleNo, reservations: 1 })
            }
            return acc
        }, [])

        return reservationsData
    }

    const downloadChart = () => {
        const chartNode = document.getElementById('chart-container')

        if (!chartNode) {
            console.error('Chart container not found.')
            return
        }

        html2canvas(chartNode).then((canvas) => {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'reservations_chart.png' // File name
                a.click()
                URL.revokeObjectURL(url)
            })
        })
    }

    return (
        <div className="h-[34rem] bg-white p-4 rounded-sm border mb-8 border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Reservations per Vehicle</strong>
            <div className="mt-3 w-full flex-1 text-xs" id="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    {view === 'pie' ? (
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="reservations"
                                nameKey="vehicleNo"
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
                            <Tooltip />
                        </PieChart>
                    ) : (
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
                            <Legend />
                            <Bar dataKey="reservations" fill="#8884d8" name="Reservations" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-3">
                <button
                    onClick={() => setView(view === 'pie' ? 'bar' : 'pie')}
                    className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm mr-2"
                >
                    Toggle {view === 'pie' ? 'Bar Chart' : 'Pie Chart'}
                </button>
                {/* <button
          onClick={downloadChart}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Chart
        </button> */}
            </div>
        </div>
    )
}
