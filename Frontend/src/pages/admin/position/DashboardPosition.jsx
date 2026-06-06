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
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Pen, Trash } from '@boxicons/react';
import { AlertConfirm, AlertError, AlertSuccess } from '../../../components/Alert';

function DashboardPosition() {
    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState('');
    const [position, setPosition] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.successMessage) {
            AlertSuccess(location.state.successMessage);

            navigate(location.pathname, { replace: true })
        }
    }, [location, navigate])


    useEffect(() => {
        fetch('http://localhost:8080/positions')
            .then(res => res.json())
            .then(data => setPosition(data));
    }, []);

    const fetchPositions = () => {
        fetch('http://localhost:8080/positions')
            .then(res => res.json())
            .then(data => setPosition(data));
    };

    const deletePosition = async (id) => {
        try {
            const result = await AlertConfirm("Yakin ingin menghapus data ini?")

            if (!result.isConfirmed) {
                return
            }

            const response = await fetch(
                `http://localhost:8080/position/delete?id=${id}`,
                {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({})
                }
            )

            const data = await response.json();

            if (!response.ok) {
                throw Error(data.message || "Gagal menghapus data")
            }

            AlertSuccess(data.message || "data berhasil dihapus")
            fetchPositions();
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
                accessorKey: 'name',
                header: 'Position Name',
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                accessorKey: 'division_name',
                header: 'Division Name',
            },
            {
                id: 'actions',
                header: 'Aksi',
                cell: ({ row }) => (
                    <div className="flex gap-2 *:cursor-pointer">
                        <button
                            onClick={() => navigate(`/admin/position/edit/${row.original.id}`)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            <Pen />
                        </button>
                        <button
                            onClick={() => deletePosition(row.original.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            <Trash />
                        </button>
                    </div>
                ),
            },
        ],
        [navigate]
    );



    const table = useReactTable({
        data: position,
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
            <h1 className="text-2xl font-bold mb-4">Positions</h1>

            <div className="mb-4 flex justify-between">
                <Link
                    to="/admin/position/create"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Create Position
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

export default DashboardPosition