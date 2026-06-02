import { useState } from "react"
import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import { useNavigate } from "react-router";
import { AlertError } from "../../../components/Alert";
import Button from "../../../components/Button"

function CreateDivision() {

    const [form, setForm] = useState({
        name: '',
        description: '',
    });
    const navigate = useNavigate();

    const handleValue = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8080/division/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal Menambahkan Data")
            }
            navigate("/admin/divisions", {
                state: {
                    successMessage: data.message
                }
            })

            setForm({
                name: "",
                description: ""
            });
        } catch (error) {
            AlertError(error)

            setForm({
                name: form.name,
                description: form.description,
            })
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <Input label={'Name'}
                name="name"
                type="text"
                value={form.name}
                onChange={handleValue} />
            <Textarea
                label={"Description"}
                name="description"
                value={form.description}
                onChange={handleValue} />
            <Button type="submit" btnName={"Submit"} />
        </form>
    )

}

export default CreateDivision