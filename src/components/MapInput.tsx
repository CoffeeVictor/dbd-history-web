import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import Select from 'react-select';
import { GameDataService } from '../services/GameDataService';

export const MapInput: React.FC = () => {

    const inputRef = useRef(null);
    const {registerField} = useField("killer");

    useEffect(() => {
        registerField({
            name: "map",
            ref: inputRef.current,
            getValue: (ref: any) => {

                const {realm, map} = ref.state.selectValue[0];

                return {realm, map};
            }
        })
    }, [inputRef, registerField])

    return (
        <Select 
            ref={inputRef}
            filterOption={(option, inputValue) => {
                return (
                    option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
                    option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
                    option.data.realm.toLowerCase().includes(inputValue.toLowerCase())
                )
            }}
            defaultValue={{
                label: 'Coal Tower',
                value: 'Coal Tower',
                realm: 'The MacMillan Estate',
                map: 'Coal Tower'
            }}
            options={GameDataService
            .getMaps()
            .map(({realm, map}) => ({
                realm, map, label: map, value: map
            }))}
        />
    )
}