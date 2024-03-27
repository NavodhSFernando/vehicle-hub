import React from 'react';
import { FaUpDown, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Button } from '../../../../components/ui/button';

export const vehicleUtilizationColumns = [
  {
    accessorKey: 'vehicleNo',
    header: 'Vehicle No',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => <div>{new Date(row.original.startDate).toLocaleDateString()}</div>,
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => <div>{new Date(row.original.endDate).toLocaleDateString()}</div>,
  },
  {
    accessorKey: 'mileage',
    header: 'Mileage',
  },
  {
    accessorKey: 'reservationId',
    header: 'Reservation ID',
  },
];
