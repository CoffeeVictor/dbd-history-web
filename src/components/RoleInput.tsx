import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import Select from 'react-select';

export const RoleInput: React.FC = () => {

    const inputRef = useRef(null);
    const {registerField} = useField('role');

    useEffect(() => {
        registerField({
            name: 'role',
            ref: inputRef.current,
            getValue: (ref: any) => {
                const {value} = ref.state.selectValue[0];

                return value;
            }
        })
    }, [registerField]);

    return (
        <Select 
        ref={inputRef}
        filterOption={(option, inputValue) => {
            return (
                option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
                option.value.toLowerCase().includes(inputValue.toLowerCase())
            )
        }}
        defaultValue={{
            label: 'Killer',
            value: 'Killer'
        }}
        options={[
            {
                label: 'Killer',
                value: 'killer'
            },
            {
                label: 'Survivor',
                value: 'survivor'
            }
        ]}
    />
    )
}