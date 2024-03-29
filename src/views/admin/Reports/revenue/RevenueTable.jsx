import React, { useState, useEffect } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getSortedRowModel
} from '@tanstack/react-table';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';

export default function DataTable({ columns, data }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalRevenue, setTotalRevenue] = useState(0);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    useEffect(() => {
        // Calculate total revenue whenever data or date range changes
        let total = 0;
        data.forEach((item) => {
            const date = new Date(item.date);
            if ((!startDate || !endDate || (date >= new Date(startDate) && date <= new Date(endDate)))) {
                total += item.amount;
            }
        });
        setTotalRevenue(total);
    }, [data, startDate, endDate]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const filterDataByDateRange = (date) => {
        if (!startDate || !endDate) return true;
        const selectedDate = new Date(date);
        const filterStartDate = new Date(startDate);
        const filterEndDate = new Date(endDate);
        return selectedDate >= filterStartDate && selectedDate <= filterEndDate;
    };

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
                    <tfoot>
                        <TableRow>
                            <TableCell colSpan={columns.length}>Total Revenue: ${totalRevenue}</TableCell>
                        </TableRow>
                    </tfoot>
                </Table>
            </div>
        </div>
    );
}
