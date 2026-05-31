function Input({ btnName, props }) {

    return (
        <button {...props} className="px-5 py-2 bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-700 hover:drop-shadow-lg">{btnName}</button>
    )

}

export default Input