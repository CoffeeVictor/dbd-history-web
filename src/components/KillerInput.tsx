import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import Select from 'react-select';
import { GameDataService } from '../services/GameDataService';

export const KillerInput: React.FC = () => {

    const inputRef = useRef(null);
    const {registerField} = useField("killer");

    useEffect(() => {
        registerField({
            name: "killer",
            ref: inputRef.current,
            getValue: (ref: any) => {

                const {title, name} = ref.state.selectValue[0];

                return {title, name};
            }
        })
    })

    return (
        <Select 
            ref={inputRef}
            filterOption={(option, inputValue) => {
                return (
                    option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
                    option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
                    option.data.name.toLowerCase().includes(inputValue.toLowerCase())
                )
            }}
            defaultValue={{
                label: 'The Trapper',
                value: 'The Trapper',
                name: 'Evan MacMillan',
                title: 'The Trapper'
            }}
            options={GameDataService
            .getKillers()
            .map(({title, name}) => ({
                title, name, label: title, value: title
            }))}
        />
    )
}