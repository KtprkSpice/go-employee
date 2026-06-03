function Select({
    label,
    name,
    value,
    onChange,
    options = [],
}) {
    return (
        <div className="flex flex-col w-6/12 p-2 gap-2 mb-5">
            <label>{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange} className="outline-none border border-black p-2 rounded-lg" >
                <option value="">--Pilih--</option>
                {options.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select