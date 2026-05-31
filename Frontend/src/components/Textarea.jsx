function Input({ label, value }) {

    return (
        <div className="flex flex-col w-6/12 p-2 gap-2 mb-5">
            <label>{label}</label>
            <textarea className="outline-none border border-black p-2 rounded-lg">{value}</textarea>
        </div>
    )

}

export default Input