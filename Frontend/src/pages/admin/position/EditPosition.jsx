import { useEffect, useState } from "react"
import Select from "../../../components/Select"
import { AlertError, AlertLoading, AlertSuccess } from "../../../components/Alert"
import Input from "../../../components/Input"
import TextArea from "../../../components/Textarea"
import Button from "../../../components/Button"
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"

function EditPosition() {
    const { id } = useParams();
    const [divisons, setDivision] = useState([])
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: '',
        description: '',
        division_id: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDivision = async () => {
            try {
                const res = await fetch(`http://localhost:8080/divisions`);
                const data = await res.json()

                setDivision(data)
            } catch (err) {
                AlertError(err);
            }
        };

        fetchDivision();
    }, [])

    useEffect(() => {
        const fetchPosition = async (e) => {
            AlertLoading("Harap tunggu")
            try {
                const res = await fetch(`http://localhost:8080/position?id=${id}`)

                const responseText = await res.text()
                console.log(responseText)

                if (!res.ok) {
                    console.log(responseText)
                    AlertError(responseText)
                    return
                }

                const data = JSON.parse(responseText);

                setForm({
                    name: data.name,
                    description: data.description,
                    division_id: data.division_id,
                })
            } catch (err) {
                AlertError(err.message);
            }
        }
        fetchPosition()
    }, [id])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.name === "division_id"
                    ? Number(e.target.value)
                    : e.target.value
        })
    }

    const HandleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:8080/position/update?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await res.json();

        if (res.ok) {
            AlertSuccess(data.message);
            navigate("/admin/positions")
        } else {
            AlertError("Gagal update");
        }
    }

    return (
        <form onSubmit={HandleUpdate} >
            <Select
                label={"Division Name"}
                name={"division_id"}
                value={form.division_id}
                onChange={handleChange}
                options={divisons} />
            <Input label={"Position Name"}
                name="name"
                value={form.name}
                type="text"
                onChange={handleChange} />
            <TextArea label={"Description"}
                name="description"
                value={form.description}
                onChange={handleChange} />
            <Button type="submit" btnName={"Update"} />
        </form>
    )
}

export default EditPosition