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
  name: string;
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
    accessorKey: 'name',
    header: 'Name',
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
  {
    accessorKey: 'lastActive',
    header: 'Last Active',
    cell: ({ row }) => {
      return format(new Date(row.getValue('lastActive')), 'PPp');
    },
  },
];

// Define filter fields
const filterFields: DataTableFilterField<User>[] = [
  {
    id: 'name', // Matches the "title" column in the data
    label: 'Name',
    placeholder: 'Search by user name',
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Dummy data
const users: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 4 === 0 ? 'inactive' : 'active',
  lastActive: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

const fetchUsers = async (state: TableState): Promise<TableData<User>> => {
  // Simulate API delay
  await delay(500);

  let filteredData = [...users];

  // Apply filters
  state.filters.forEach((filter) => {
    filteredData = filteredData.filter((item) => {
      const value = item[filter.id as keyof User];
      return value
        .toString()
        .toLowerCase()
        .includes(filter.value.toLowerCase());
    });
  });

  // Apply sorting
  if (state.sorting.length) {
    const { id, desc } = state.sorting[0];
    filteredData.sort((a, b) => {
      const aValue = a[id as keyof User];
      const bValue = b[id as keyof User];
      return desc
        ? bValue.toString().localeCompare(aValue.toString())
        : aValue.toString().localeCompare(bValue.toString());
    });
  }

  // Calculate pagination
  const { pageIndex, pageSize } = state.pagination;
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const paginatedData = filteredData.slice(start, end);

  return {
    data: paginatedData,
    pageCount: Math.ceil(filteredData.length / pageSize),
    totalRows: filteredData.length,
  };
};

export default function FindExchangeOffer() {
  const [state, setState] = useState<TableState>({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting: [],
    filters: [],
  });
  const [tableData, setTableData] = useState<TableData<User>>({
    data: [],
    pageCount: 0,
    totalRows: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchUsers(state);
        setTableData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [state]);

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

  const { table } = useDataTable({
    data: tableData.data,
    columns,
    pageCount: tableData.pageCount,
    filterFields,
    initialState: {
      pagination: state.pagination,
      sorting: [{ id: 'name', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <div>...</div>
      </DataTableToolbar>
    </DataTable>
  );
}
