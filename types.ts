import React from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  joinedDate: string; // ISO string format for easy date parsing
}

export interface ColumnDef<T> {
  accessorKey: keyof T;
  header: string;
  minWidth?: number;
  editable?: boolean; // New flag to mark columns as editable
  cell?: (value: T[keyof T]) => React.ReactNode;
}

export interface SortConfig<T> {
  key: keyof T;
  direction: 'ascending' | 'descending';
}