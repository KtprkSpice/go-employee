import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import Button from "../../../components/Button"
import { useState } from "react"

function CreateEmployee() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    })

    // Ambil value dari form
    const handleValue = (e) => {
        setForm({
            ...from,
            [e.target.name]: e.target.value
        })
    }



    return <>
        <form action="">
            <Input label={'Nama'}
                name="name"
                type="text"
                value={form.name}
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
            <Textarea label={"Alamat"}
                name="address"
                value={form.address}
                onChange={handleValue} />
            <Button btnName={"Submit"} type="submit" />
        </form>
    </>
}

export default CreateEmployee