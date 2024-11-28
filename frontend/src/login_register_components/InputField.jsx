import React from 'react';
import { Field } from "../components/ui/field"
import { Input } from '@chakra-ui/react';

const InputField = ({ label, color, required, width }) => {
    return (
        <Field label={label} color={color} required={required} width={width}>
            <Input borderColor={"gray.300"} bg={"white"} color={"gray.800"}/>
        </Field>
    )
}

export default InputField