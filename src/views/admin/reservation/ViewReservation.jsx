import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns as originalColumns } from './Columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import apiclient from '../../../axiosConfig'

export default function ViewReservation() {
    const [Reservation, setReservation] = useState([])

    const fetchReservation = async () => {
        try {
            const response = await apiclient.get('/AdminReservation/View-Reservations')
            setReservation(response.data)
            console.log('Fetched Customer Reservations:', response.data)
        } catch (error) {
            console.error('Failed to fetch Customer Reservations:', error)
        }
    }

    useEffect(() => {
        fetchReservation()
    }, [])

    const columns = originalColumns.map((column) => {
        if (column.accessorKey === 'actions') {
            return {
                ...column,
                refetchReservation: fetchReservation
            }
        }
        return column
    })

    const filterByStatus = (status) => Reservation.filter((item) => item.status === status)

    return (
        <>
            <Tabs defaultValue="all" className="w-full p-6">
                <TabsList className="grid w-2/3 grid-cols-8">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="waiting">Waiting</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                    <TabsTrigger value="ended">Ended</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={Reservation} />
                    </div>
                </TabsContent>
                <TabsContent value="waiting">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={filterByStatus('Waiting')} />
                    </div>
                </TabsContent>
                <TabsContent value="pending">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={filterByStatus('Pending')} />
                    </div>
                </TabsContent>
                <TabsContent value="confirmed">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={filterByStatus('Confirmed')} />
                    </div>
                </TabsContent>
                <TabsContent value="ongoing">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={filterByStatus('Ongoing')} />
                    </div>
                </TabsContent>
                <TabsContent value="ended">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={filterByStatus('Ended')} />
                    </div>
                </TabsContent>
                <TabsContent value="completed">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={filterByStatus('Completed')} />
                    </div>
                </TabsContent>
                <TabsContent value="cancelled">
                    <div className="flex flex-col p-6 bg-white rounded-lg">
                        <DataTable columns={columns} data={filterByStatus('Cancelled')} />
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}
