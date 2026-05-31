import $ from 'jquery'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function dashboardEmployee() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/employee')
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    useEffect(() => {
        if (employees.length > 0) {
            const table = $('#listKaryawan').DataTable();

            return () => {
                table.destroy();
            }
        }

    }, [employees]);



    return <>
        <h1 className="text-2xl font-bold mb-10">Data Buku</h1>
        <div className="mb-10">
            <Link to={'/admin/employee/create'} className="px-5 py-2 bg-blue-500 text-white rounded-lg">Tambah Buku</Link>
        </div>
        <table id="listKaryawan" className="display">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Code Buku</th>
                    <th>Nama Buku</th>
                    <th>Kategori</th>
                    <th>Tanggal Masuk</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp, index) => (
                    <tr key={emp.id}>
                        <td>{index + 1}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.phone}</td>
                        <td>{emp.address}</td>
                        <td>Aksi</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>
}

export default dashboardEmployee;