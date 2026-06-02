import { useEffect, useState } from "react"
import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import { useNavigate, useParams } from "react-router";
import { AlertError, AlertSuccess } from "../../../components/Alert";
import Button from "../../../components/Button"

function EditDivision() {

    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        description: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEmployee = async (e) => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/division?id=${id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Gagal ambil data");
                }

                setForm({
                    'name': data.name,
                    'description': data.description,
                });
            } catch (err) {
                AlertError(err.message);
            } finally {
                setLoading(false)
            }
        };

        fetchEmployee()
    }, [id])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:8080/division/update?id=${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            }
        )

        const data = await res.json();

        if (res.ok) {
            AlertSuccess(data.message)
            navigate("/admin/divisions");
        } else {
            AlertError(data.message || "Gagal Update")
        }

        if (loading) {
            return <div className="p-6">Loading...</div>;
        }
    }




    return (
        <form onSubmit={handleSubmit}>
            <Input label={'Name'}
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange} />
            <Textarea
                label={"Description"}
                name="description"
                value={form.description}
                onChange={handleChange} />
            <Button type="submit" btnName={"Update"} />
        </form>
    )

}

export default EditDivision