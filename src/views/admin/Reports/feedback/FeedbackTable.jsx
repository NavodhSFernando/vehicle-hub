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
import { date } from 'zod'

export default function DataTable({ columns, data }) {
    const [columnFilters, setColumnFilters] = React.useState([])
    const [sorting, setSorting] = React.useState([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    })

    return (
        <div>
            <div className="flex flex-row items-center my-8">
                <div className="flex flex-col space-y-1 pt-2 w-full pb-4">
                    <Label>Reservation Date Range</Label>
                    <Input
                        type="date"
                        placeholder="Filter date range"
                        value={table.getColumn('date')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('date')?.setFilterValue(event.target.value)}
                        className="max-w-lg"
                    />
                </div>
                <div className="flex flex-col space-y-1 pt-2 w-full pb-4">
                    <Label>Customer Name</Label>
                    <Input
                        placeholder="Filter customer name"
                        value={table.getColumn('customer')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('customer')?.setFilterValue(event.target.value)}
                        className="max-w-lg"
                    />
                </div>
                </div>
                <div className="flex flex-row items-center my-8">
                

                <div className="flex flex-col space-y-1 pt-2 w-full pb-4">
                    <Label>Vehicle</Label>
                    <Input
                        placeholder="Filter Vehicle name"
                        value={table.getColumn('vehicle')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('vehicle')?.setFilterValue(event.target.value)}
                        className="max-w-lg"
                    />
                </div>

                <div className="flex flex-col space-y-1 pt-2 w-full pb-4">
                    <Label>Rating</Label>
                    <Input
                        placeholder="Enter Rating No"
                        value={table.getColumn('rating')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('rating')?.setFilterValue(event.target.value)}
                        className="max-w-lg"
                    />
                </div>
            </div>

            <div className="rounded-md border" id="table-container">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="bg-slate-200" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="py-1 px-5" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="py-5 px-5" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
