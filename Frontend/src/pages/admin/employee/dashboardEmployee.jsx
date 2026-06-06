import { useEffect, useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Link, useLocation, useNavigate } from 'react-router';
import { AlertConfirm, AlertError, AlertSuccess } from '../../../components/Alert';

import { CaretBigUp, CaretBigDown, ArrowDownNarrowWide, ArrowUpNarrowWide } from "@boxicons/react"

function DashboardEmployee() {
    const [employees, setEmployees] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.successMessage) {
            AlertSuccess(location.state.successMessage);

            navigate(location.pathname, { replace: true })
        }
    }, [location, navigate])

    useEffect(() => {
        fetch('http://localhost:8080/employees')
            .then(res => res.json())
            .then(data => setEmployees(data));
    }, []);

    const fetchEmployees = () => {
        fetch('http://localhost:8080/employees')
            .then(res => res.json())
            .then(data => setEmployees(data));
    };

    const deleteEmployee = async (id) => {
        try {
            const result = await AlertConfirm("Yakin ingin menghapus data ini?")

            if (!result.isConfirmed) return

            const response = await fetch(
                `http://localhost:8080/employee/delete?id=${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({})
                }
            )

            const data = await response.json();

            if (!response.ok) {
                throw Error(data.message || "Failed to delete employee");
            }


            AlertSuccess(data.message);
            fetchEmployees();
        } catch (error) {
            AlertError(error);
        }
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'no',
                header: 'No',
                cell: ({ row }) => row.index + 1,
            },
            {
                accessorKey: 'fullname',
                header: 'Employee Name',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            },
            {
                accessorKey: 'division_name',
                header: 'Division Name',
            },
            {
                accessorKey: 'position_name',
                header: 'Position Name',
            },
            {
                id: 'actions',
                header: 'Aksi',
                cell: ({ row }) => (
                    <div className="flex gap-2 *:cursor-pointer">
                        <button
                            onClick={() => navigate(`/admin/employee/edit/${row.original.id}`)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteEmployee(row.original.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [navigate]
    );

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>

            <div className="mb-4 flex justify-between">
                <Link
                    to="/admin/employee/create"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Create Employee
                </Link>

                <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                    className="px-3 py-2 border rounded"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2 text-left border">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="cursor-pointer select-none flex"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getIsSorted() === "asc" && <ArrowDownNarrowWide />}
                                                {header.column.getIsSorted() === "desc" && <ArrowUpNarrowWide />}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-2 border">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex gap-2 mt-4 justify-center">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-3 py-1">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DashboardEmployee