import { useState } from "react";

export const useForm = (initialState, callback = null) => {
    const [values, setValues] = useState(initialState);

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        callback();
        setValues(initialState);
    }

    const regex = /^[\s].*$/;

    return {
        values,
        regex,
        onChange,
        onSubmit
    }

}

export const Form = ({ children, onSubmit, ...rest }) => {


    return (
        <form onSubmit={onSubmit} {...rest}>
            { children }
        </form>
    )
}