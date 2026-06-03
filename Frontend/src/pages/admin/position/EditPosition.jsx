import { useEffect, useState } from "react"
import Select from "../../../components/Select"
import { AlertError } from "../../../components/Alert"
import Input from "../../../components/Input"
import TextArea from "../../../components/Textarea"
import Button from "../../../components/Button"
import { useNavigate } from "react-router"

function EditPosition() {
    const [divisons, setDivision] = useState([])
    const [form, setForm] = useState({
        name: '',
        description: '',
        division_id: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/divisions`)
            .then((res) => res.json())
            .then((data) => setDivision(data))
            .catch((err) => AlertError(err))
    }, [])

    const handleValue = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`
                http://localhost:8080/position/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    // harus seperti ini karena ambil int
                    body: JSON.stringify({
                        ...form,
                        division_id: Number(form.division_id)
                    })
                })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal menambahkan data")
            }

            navigate('/admin/positions', {
                state: {
                    successMessage: data.message
                }
            })

            setForm({
                name: "",
                description: "",
                division_id: "",
            })

        } catch (error) {
            AlertError(error)

            setForm({
                name: form.name,
                description: form.description,
                division_id: form.division_id,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Select
                label={"Division Name"}
                name={"division_id"}
                value={form.division_id}
                onChange={handleValue}
                options={divisons} />
            <Input label={"Position Name"}
                name="name"
                value={form.name}
                type="text"
                onChange={handleValue} />
            <TextArea label={"Description"}
                name="description"
                value={form.description}
                onChange={handleValue} />
            <Button type="submit" btnName={"Submit"} />
        </form>
    )
}

export default EditPosition