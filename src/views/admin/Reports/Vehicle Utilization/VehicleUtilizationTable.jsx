// DataTable Component
import React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getSortedRowModel
} from '@tanstack/react-table'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table'

export default function DataTable({ columns, data }) {
    const [startDate, setStartDate] = React.useState('')
    const [endDate, setEndDate] = React.useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value)
    }

    const filterDataByDateRange = (date) => {
        if (!startDate || !endDate) return true // If either start date or end date is not set, don't filter
        const selectedDate = new Date(date)
        const filterStartDate = new Date(startDate)
        const filterEndDate = new Date(endDate)
        return selectedDate >= filterStartDate && selectedDate <= filterEndDate
    }

    return (
        <div>
            <div className="flex flex-row items-center my-8">
                <div className="flex flex-col space-y-1 pt-2 w-full pb-4">
                    <Label>Start Date</Label>
                    <Input type="date" value={startDate} onChange={handleStartDateChange} className="max-w-lg" />
                </div>
                <div className="flex flex-col space-y-1 pt-2 w-full pb-4">
                    <Label>End Date</Label>
                    <Input type="date" value={endDate} onChange={handleEndDateChange} className="max-w-lg" />
                </div>
            </div>
            <div>
                <div className="flex flex-col space-y-1 pt-2 w-full pb-4">
                    <Label>Vehicle No</Label>
                    <Input
                        placeholder="Enter Vehicle Number"
                        value={table.getColumn('vehicleNo')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('vehicleNo')?.setFilterValue(event.target.value)}
                        className="max-w-lg"
                    />
                </div>
            </div>
            
            <div className="rounded-md border" id="table-container">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="bg-slate-200" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead className="py-1 px-5" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table
                            .getRowModel()
                            .rows?.filter((row) => filterDataByDateRange(row.original.date))
                            .map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="py-5 px-5" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
