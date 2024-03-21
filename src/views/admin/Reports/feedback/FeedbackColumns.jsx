// FeedbackColumns.js
import React from 'react';
import { FaUpDown, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Button } from '../../../../components/ui/button';

export const feedbackColumns = [
  {
    accessorKey: 'id',
    header: 'Feedback ID',
    cell: ({ row }) => <div className="font-medium">{'#' + row.original.id}</div>,
  },
  {
    accessorKey: 'content',
    header: 'Content',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => <div>{'⭐'.repeat(row.original.rating)}</div>, // Display stars based on rating value
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <div>{new Date(row.original.date).toLocaleDateString()}</div>,
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'vehicle',
    header: 'Vehicle',
  },
  
];
