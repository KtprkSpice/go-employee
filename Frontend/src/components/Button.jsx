function Button({ btnName, ...props }) {

    const btnClass =
        // IF
        btnName === 'Submit'
            ? "bg-blue-500 hover:bg-blue-700"
            // Else If
            : btnName === "Update"
                ? "bg-yellow-500 hover:bg-yellow-700"
                // else
                : "bg-blue-500 hover:bg-blue-700";

    return (
        <button {...props} className={`px-5 py-2 rounded-lg text-white cursor-pointer hover:drop-shadow-lg ${btnClass}`}>{btnName}</button>
    )

}

export default Button