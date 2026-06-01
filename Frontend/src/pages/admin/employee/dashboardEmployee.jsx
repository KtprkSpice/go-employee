import $ from 'jquery'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { AlertSuccess } from '../../../components/Alert';
import { Pen, Trash } from "@boxicons/react"

function dashboardEmployee() {

    const [employees, setEmployees] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:8080/employees')
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

    useEffect(() => {
        if (location.state?.successMessage) {
            AlertSuccess(location.state.successMessage)

            navigate(location.pathname, {
                replace: true,
                state: {}
            })
        }
    }, [location, navigate]);



    return <>
        <h1 className="text-2xl font-bold mb-10">Employees</h1>
        <div className="mb-10">
            <Link to={'/admin/employee/create'} className="px-5 py-2 bg-blue-500 text-white rounded-lg">Create Employee</Link>
        </div>
        <table id="listKaryawan" className="display">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp, index) => (
                    <tr key={emp.id}>
                        <td>{index + 1}</td>
                        <td>{emp.fullname}</td>
                        <td>{emp.email}</td>
                        <td>{emp.phone}</td>
                        <td>
                            <button
                                onClick={() => {
                                    if ($.fn.DataTable.isDataTable('#listKaryawan')) {
                                        $('#listKaryawan').DataTable().destroy(true);
                                    }

                                    setTimeout(() => {
                                        navigate(`/admin/employee/edit/${emp.id}`);
                                    }, 100);
                                }}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>
}

export default dashboardEmployee;