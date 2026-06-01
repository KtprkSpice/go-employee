import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import Button from "../../../components/Button"
import { useState } from "react"
import { AlertConfirm, AlertError, AlertSuccess } from "../../../components/Alert"
import { useNavigate } from "react-router"

function CreateEmployee() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
    })

    // Ambil value dari form
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
                "http://localhost:8080/employees/create",
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
                throw new Error(data.message || "Gagal Menambahkan Data");
            }

            navigate("/admin/employee", {
                state: {
                    successMessage: data.message
                }
            })


            setForm({
                fullname: "",
                email: "",
                phone: ""
            })

        } catch (error) {
            AlertError(error)

            setForm({
                fullname: form.fullname,
                email: form.email,
                phone: form.phone,
            })
        }
    }


    return <>
        <form onSubmit={handleSubmit}>
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