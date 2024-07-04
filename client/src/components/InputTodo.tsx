import React, { Fragment, useState, FormEvent } from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location.href = "/";
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Fragment>
            <h1 className="text-container mt-5">PERN ToDo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;