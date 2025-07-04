import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- INLINED TYPES & COMPONENTS ---

// Inlined type definitions to simplify dependencies
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  joinedDate: string;
}

export interface ColumnDef<T> {
  accessorKey: keyof T;
  header: string;
  minWidth?: number;
  editable?: boolean;
  cell?: (value: T[keyof T]) => React.ReactNode;
}

// Inlined SVG icon component
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

// --- SPREADSHEETTABLE COMPONENT IMPLEMENTATION ---

interface SpreadsheetTableProps<T extends { id: number | string }> {
  columns: ColumnDef<T>[];
  data: T[];
  onUpdateData: (rowId: number | string, columnId: keyof T, value: any) => void;
}

const SpreadsheetTable = <T extends { id: number | string }>({ columns, data, onUpdateData }: SpreadsheetTableProps<T>) => {
  const [editingCell, setEditingCell] = useState<{ rowId: number | string; columnKey: keyof T } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when a cell enters editing mode
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (rowId: number | string, column: ColumnDef<T>) => {
    if (column.editable) {
      setEditingCell({ rowId, columnKey: column.accessorKey });
    }
  };

  const handleBlur = () => {
    setEditingCell(null);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, row: T, column: ColumnDef<T>) => {
      if(event.key === 'Enter'){
          onUpdateData(row.id, column.accessorKey, event.currentTarget.value);
          setEditingCell(null);
      } else if (event.key === 'Escape') {
          setEditingCell(null);
      }
  }

  const renderCellContent = (row: T, column: ColumnDef<T>) => {
      const isEditing = editingCell?.rowId === row.id && editingCell?.columnKey === column.accessorKey;
      const cellValue = row[column.accessorKey];

      if (isEditing) {
        return (
          <input
            ref={inputRef}
            type="text"
            defaultValue={cellValue as string}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, row, column)}
            className="w-full h-full p-2.5 box-border bg-blue-50 border-2 border-blue-400 focus:outline-none rounded"
          />
        );
      }

      if (column.cell) {
          return column.cell(cellValue);
      }
      return String(cellValue);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border-collapse">
        <thead className="bg-gray-50/75">
          <tr>
            {columns.map(col => (
              <th
                key={col.accessorKey as string}
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50/75 backdrop-blur-sm z-10"
                style={{ minWidth: col.minWidth }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map(col => (
                <td
                  key={col.accessorKey as string}
                  className={`whitespace-nowrap ${col.editable ? 'cursor-cell' : ''} p-0`}
                  onClick={() => handleCellClick(row.id, col)}
                >
                 <div className="px-3 py-2.5 text-sm text-gray-700 h-full w-full">
                    {renderCellContent(row, col)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// --- MOCK DATA & COLUMN DEFINITIONS ---

const initialUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', joinedDate: '2023-01-15T10:00:00Z' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Active', joinedDate: '2023-02-20T11:30:00Z' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'Viewer', status: 'Inactive', joinedDate: '2022-11-30T09:00:00Z' },
    { id: 4, name: 'Mary Johnson', email: 'mary.johnson@example.com', role: 'Editor', status: 'Pending', joinedDate: '2023-05-10T14:20:00Z' },
    { id: 5, name: 'Chris Lee', email: 'chris.lee@example.com', role: 'Viewer', status: 'Active', joinedDate: '2021-08-25T08:45:00Z' },
    { id: 6, name: 'Patricia Brown', email: 'patricia.brown@example.com', role: 'Admin', status: 'Active', joinedDate: '2023-03-12T16:00:00Z' },
    { id: 7, name: 'Robert Williams', email: 'robert.williams@example.com', role: 'Editor', status: 'Inactive', joinedDate: '2022-09-01T12:10:00Z' },
    { id: 8, name: 'Linda Davis', email: 'linda.davis@example.com', role: 'Viewer', status: 'Active', joinedDate: '2023-06-18T07:55:00Z' },
    { id: 9, name: 'Michael Miller', email: 'michael.miller@example.com', role: 'Editor', status: 'Pending', joinedDate: '2023-07-22T18:00:00Z' },
    { id: 10, name: 'Elizabeth Wilson', email: 'elizabeth.wilson@example.com', role: 'Admin', status: 'Active', joinedDate: '2020-04-05T13:30:00Z' },
    { id: 11, name: 'James Moore', email: 'james.moore@example.com', role: 'Viewer', status: 'Inactive', joinedDate: '2023-08-01T20:00:00Z' },
    { id: 12, name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com', role: 'Editor', status: 'Active', joinedDate: '2022-12-10T11:00:00Z' },
];

const ALL_COLUMNS: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID', minWidth: 80, editable: false },
  { accessorKey: 'name', header: 'Name', minWidth: 200, editable: true },
  { accessorKey: 'email', header: 'Email', minWidth: 250, editable: true },
  { accessorKey: 'role', header: 'Role', minWidth: 120, editable: true },
  {
    accessorKey: 'status',
    header: 'Status',
    minWidth: 120,
    editable: false,
    cell: (status) => {
      const statusValue = status as 'Active' | 'Inactive' | 'Pending';
      const baseClasses = 'px-2.5 py-1 text-xs font-semibold rounded-full inline-block tracking-wide';
      const statusClasses = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-gray-200 text-gray-800',
        Pending: 'bg-yellow-100 text-yellow-800',
      };
      return <span className={`${baseClasses} ${statusClasses[statusValue]}`}>{statusValue}</span>;
    },
  },
  {
    accessorKey: 'joinedDate',
    header: 'Joined Date',
    minWidth: 150,
    editable: false,
    cell: (dateString) => new Date(dateString as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
];


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() =>
      Object.fromEntries(ALL_COLUMNS.map(col => [col.accessorKey as string, true]))
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleUpdateData = (userId: number | string, columnId: keyof User, value: any) => {
        if (columnId === 'role' && !['Admin', 'Editor', 'Viewer'].includes(value)) {
          alert('Invalid role. Please use "Admin", "Editor", or "Viewer".');
          return;
        }
    
        setUsers(currentUsers =>
          currentUsers.map(user =>
            user.id === userId ? { ...user, [columnId]: value } : user
          )
        );
      };
  
    const handleVisibilityChange = (accessorKey: string) => {
      setVisibleColumns(prev => ({ ...prev, [accessorKey]: !prev[accessorKey] }));
    };
    
    const columns = useMemo(() => {
      return ALL_COLUMNS.filter(col => visibleColumns[col.accessorKey as string]);
    }, [visibleColumns]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-2 text-lg">An interactive table to view and manage user data.</p>
        </header>

        <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(prev => !prev)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Columns
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {ALL_COLUMNS.map(col => (
                    <label key={col.accessorKey as string} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={visibleColumns[col.accessorKey as string] ?? true}
                        onChange={() => handleVisibilityChange(col.accessorKey as string)}
                      />
                      {col.header}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <main className="bg-white rounded-xl shadow-md ring-1 ring-black ring-opacity-5">
          <SpreadsheetTable columns={columns} data={users} onUpdateData={handleUpdateData} />
        </main>
      </div>
    </div>
  );
};

export default App;
