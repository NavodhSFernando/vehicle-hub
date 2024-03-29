import React from 'react';
import { FaUpDown, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Button } from '../../../../components/ui/button';

export const revenueColumns = [
  {
    accessorKey: 'id',
    header: 'Revenue ID',
    cell: ({ row }) => <div className="font-medium">{'#' + row.original.id}</div>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <div>{new Date(row.original.date).toLocaleDateString()}</div>,
  },
];
