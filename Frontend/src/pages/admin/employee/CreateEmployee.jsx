import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import Button from "../../../components/Button"
import { useEffect, useState } from "react"
import { AlertConfirm, AlertError, AlertSuccess } from "../../../components/Alert"
import { useNavigate } from "react-router"
import Select from "../../../components/Select"

function CreateEmployee() {
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

    // Get Divsion
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
    })

    // Ambil value dari form
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8080/employees/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...form,
                        position_id: Number(form.position_id),
                        division_id: Number(form.division_id)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal Menambahkan Data");
            }

            navigate("/admin/employees", {
                state: {
                    successMessage: data.message
                }
            })


            setForm({
                fullname: "",
                email: "",
                phone: "",
                position_id: "",
                division_id: ""
            })

        } catch (error) {
            AlertError(error)

            setForm({
                fullname: "",
                email: "",
                phone: "",
                position_id: "",
                division_id: ""
            })
        }
    }


    return <>
        <form onSubmit={handleSubmit}>
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
            <Button btnName={"Submit"} type="submit" />
        </form>
    </>
}

export default CreateEmployee