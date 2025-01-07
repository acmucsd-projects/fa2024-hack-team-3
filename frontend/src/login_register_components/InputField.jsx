import React from 'react';
import { Field } from "../components/ui/field"
import { Input } from '@chakra-ui/react';
import system from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
const InputField = ({ label, color, required, width, name, value, onChange, type = "text" }) => {
    
    return (
        <ChakraProvider value={system}>
        <Field label={label} color={color} required={required} width={width}>
            <Input 
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                borderColor={"gray.300`"} 
                bg={"bg.muted"} 
                color={"bg.text"}
                />
        </Field>
        </ChakraProvider>
    )
}

export default InputField