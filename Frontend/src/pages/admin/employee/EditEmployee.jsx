import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertError, AlertSuccess } from "../../../components/Alert";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
    });

    // ambil data employee by id
    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/employee?id=${id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch");
                }

                setForm({
                    fullname: data.fullname,
                    email: data.email,
                    phone: data.phone,
                });
            } catch (err) {
                AlertError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    // handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:8080/employees/update?id=${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            }
        );

        const data = await res.json();

        if (res.ok) {
            AlertSuccess(data.message);
            navigate("/admin/employee");
        } else {
            AlertError("Gagal update");
        }
    };
    if (loading) {
        return <div className="p-6">Loading...</div>;
    }


    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Edit Employee
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 w-full"
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 w-full"
                />

                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border p-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 cursor-pointer"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditEmployee;