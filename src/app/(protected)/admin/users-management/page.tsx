/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { Badge } from '@/components/ui/badge';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTableFilterField } from '@/types/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
// import { Column } from "@tanstack/react-table";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface SortingState {
  id: string;
  desc: boolean;
}

export interface FilterState {
  id: string;
  value: string;
}

export interface TableState {
  pagination: PaginationState;
  sorting: SortingState[];
  filters: FilterState[];
}

export interface TableData<T> {
  data: T[];
  pageCount: number;
  totalRows: number;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: 'Frst Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      );
    },
  },
];

// Define filter fields
const filterFields: DataTableFilterField<User>[] = [
  {
    id: 'email', // Matches the "title" column in the data
    label: 'Email',
    placeholder: 'Search by email',
  },
  {
    id: 'status', // Matches the "status" column in the data
    label: 'Status',
    options: [
      { label: 'Todo', value: 'todo' },
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Completed', value: 'completed' },
    ],
  },
];

export default function FindExchangeOffer() {
  const [state, setState] = useState<TableState>({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting: [],
    filters: [],
  });
  const [tableData, setTableData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/users?page=${state.pagination.pageIndex}&limit=${state.pagination.pageSize}`
        );
        const json = await response.json();
        const { data, pagination } = json;
        console.log('kkk', data, pagination);
        setTableData(data);
        setState((prev) => ({
          ...prev,
          pagination: { pageIndex: pagination.page, pageSize: 1 },
        }));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handlePaginationChange = (pagination: any) => {
    console.log('lll', pagination);
    setState((prev) => ({ ...prev, pagination }));
  };

  const handleSortingChange = (sorting: any) => {
    setState((prev) => ({ ...prev, sorting }));
  };

  //   const handleFilterChange = (filters: FilterState[]) => {
  //     setState((prev) => ({ ...prev, filters }));
  //   };

  console.log('lll', tableData);

  const { table } = useDataTable({
    data: tableData,
    columns,
    pageCount: tableData.length,
    filterFields,
    initialState: {
      pagination: state.pagination,
      sorting: [{ id: 'firstName', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields} />
    </DataTable>
  );
}
