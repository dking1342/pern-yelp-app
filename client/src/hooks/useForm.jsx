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

    return {
        values,
        onChange,
        onSubmit
    }

}