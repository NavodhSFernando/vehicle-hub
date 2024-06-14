import React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getSortedRowModel
} from '@tanstack/react-table'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Calendar } from '../../../components/ui/calendar'
import { Button } from '../../../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import cn from 'classnames'

export default function DataTable({ columns, data }) {
    const [columnFilters, setColumnFilters] = React.useState([])
    const [sorting, setSorting] = React.useState([])
    const [startDate, setStartDate] = React.useState(null)
    const [endDate, setEndDate] = React.useState(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters
        }
    })

    // Update the date filter when the date state changes
    React.useEffect(() => {
        if (startDate) {
            table.getColumn('startDate')?.setFilterValue(format(startDate, 'yyyy-MM-dd'))
        } else {
            table.getColumn('startDate')?.setFilterValue('')
        }
    }, [startDate, table])

    React.useEffect(() => {
        if (endDate) {
            table.getColumn('endDate')?.setFilterValue(format(endDate, 'yyyy-MM-dd'))
        } else {
            table.getColumn('endDate')?.setFilterValue('')
        }
    }, [endDate, table])

    const clearFilters = () => {
        setStartDate(null)
        setColumnFilters([])
        setSorting([])
        table.resetColumnFilters()
        table.resetSorting()
    }

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
                <div className="flex flex-col space-y-1 pt-2 pb-4">
                    <Label>Reservation Start</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'justify-start text-left font-normal p-3 w-3/4 h-auto',
                                    !startDate && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col space-y-1 pt-2 pb-4">
                    <Label>Reservation End</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'justify-start text-left font-normal p-3 w-3/4 h-auto',
                                    !endDate && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col space-y-1 pt-2 pb-4">
                    <Label>Customer Name</Label>
                    <Input
                        placeholder="Filter customer name"
                        value={table.getColumn('name')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                        className="w-3/4"
                    />
                </div>
                <div className="flex flex-col space-y-1 pt-2 pb-4">
                    <Label>Reservation ID</Label>
                    <Input
                        placeholder="Filter reservation ID"
                        value={table.getColumn('id')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
                        className="w-3/4"
                    />
                </div>
                <div className="flex flex-col space-y-1 pt-2 pb-4">
                    <Label>Registration Number</Label>
                    <Input
                        placeholder="Filter registration number"
                        value={table.getColumn('regNo')?.getFilterValue() ?? ''}
                        onChange={(event) => table.getColumn('regNo')?.setFilterValue(event.target.value)}
                        className="w-3/4"
                    />
                </div>
                <div className="flex flex-col space-y-1 pt-2 pb-4 lg:items-end lg:justify-end">
                    <Button
                        onClick={clearFilters}
                        className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                    >
                        Clear Filters
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
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
