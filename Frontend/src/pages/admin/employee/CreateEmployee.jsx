import Input from "../../../components/Input"

function CreateEmployee() {
    return <>
        <form action="">
            <Input label={'Nama'} name="name" type="text" />
            <Input label={'email'} name="email" type="email" />
            <Input label={'phone'} name="phone" type="number" min="0" />
        </form>
    </>
}

export default CreateEmployee