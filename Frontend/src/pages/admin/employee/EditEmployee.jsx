import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertError, AlertLoading, AlertSuccess } from "../../../components/Alert";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [division, setDivision] = useState([]);
    const [position, setPosition] = useState([]);
    const [filteredPosition, setFilteredPosition] = useState([])
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        position_id: "",
        division_id: ""
    })

    useEffect(() => {
        fetch(`http://localhost:8080/divisions`)
            // Res diubah jadi json
            .then((res) => res.json())
            // Jsoin di store di variable data
            .then((data) => setDivision(data))
            // Catch jika ada err
            .catch((err) => AlertError(err))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/positions`)
            .then((res) => res.json())
            .then((data) => setPosition(data))
            .catch((err) => AlertError(err))
    }, [])

    useEffect(() => {
        if (form.division_id && position.length > 0) {
            const filtered = position.filter(
                p => p.division_id === Number(form.division_id)
            );

            setFilteredPosition(filtered);
        }
    }, [form.division_id, position]);

    useEffect(() => {
        const fetchEmployee = async (e) => {
            AlertLoading("Harap tunggu")
            try {
                const res = await fetch(`http://localhost:8080/employee?id=${id}`)
                const data = await res.json();

                if (!res.ok) {
                    AlertError(data.error)
                    return
                }


                setForm({
                    fullname: data.fullname,
                    email: data.email,
                    phone: data.phone,
                    position_id: data.position_id,
                    division_id: data.division_id
                })
            } catch (err) {
                AlertError(err.message);
            }
        }
        fetchEmployee()
    }, [id])

    const handleValue = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === "division_id") {
            const filtered = position.filter(
                p => p.division_id === Number(value)
            );

            setFilteredPosition(filtered);

            setForm(prev => ({
                ...prev,
                division_id: value,
                position_id: ""
            }))
        }
    }

    const HandleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:8080/employee/update?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...form,
                position_id: Number(form.position_id),
                division_id: Number(form.division_id)
            })
        })

        const data = await res.json();

        if (res.ok) {
            AlertSuccess(data.message);
            navigate("/admin/employees")
        } else {
            AlertError("Gagal update");
        }
    }



    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Edit Employee
            </h1>

            <form onSubmit={HandleUpdate}>
                <Select
                    label={"Division Name"}
                    name={"division_id"}
                    value={form.division_id}
                    onChange={handleValue}
                    options={division}
                />
                <Select
                    label={"Position Name"}
                    name={"position_id"}
                    value={form.position_id}
                    onChange={handleValue}
                    options={filteredPosition}
                />
                <Input label={'Nama'}
                    name="fullname"
                    type="text"
                    value={form.fullname}
                    onChange={handleValue} />
                <Input label={'email'}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleValue} />
                <Input label={'phone'}
                    name="phone"
                    type="number"
                    min="0"
                    value={form.phone}
                    onChange={handleValue} />
                <Button btnName={"Update"} type="submit" />
            </form>
        </div>
    );
}

export default EditEmployee;