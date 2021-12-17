import { Flex } from "@chakra-ui/react";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";
import Select from 'react-select';
import { GameDataService } from "../services/GameDataService";

export interface ISingleSurvivorInputProps {
    defaultSurvivor: string;
    survivorIndex: number;
}

export const SingleSurvivorInput: React.FC<ISingleSurvivorInputProps> = (props) => {

    const {defaultSurvivor, survivorIndex} = props;

    const nameRef = useRef(null);
    const resultRef = useRef(null);

    const {registerField} = useField(`survivors[${survivorIndex}]`);

    useEffect(() => {
        registerField({
            name: `survivors[${survivorIndex}].name`,
            ref: nameRef.current,
            getValue: (ref: any) => {
                return ref.state.selectValue[0].value;
            }
        })
    }, [registerField, survivorIndex]);

    useEffect(() => {
        registerField({
            name: `survivors[${survivorIndex}].result`,
            ref: resultRef.current,
            getValue: (ref: any) => {
                return ref.state.selectValue[0].value;
            }
        })
    }, [registerField, survivorIndex])

    return (
        <Flex justify={'center'} my={'2'}>
            <Select
                ref={nameRef}
                defaultValue={{
                    label: defaultSurvivor,
                    value: defaultSurvivor,
                    name: defaultSurvivor
                }}
                styles={{container: (def) => ({...def, flex: 3})}}
                filterOption={(option, inputValue) => {
                    return (
                        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.data.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                }}
                options={GameDataService
                .getSurvivors()
                .map((name) => ({
                    name, label: name, value: name
                }))}
            />
            <Select 
                ref={resultRef}
                defaultValue={{
                    label: "Sacrificed",
                    value: 'Sacrificed'
                }}
                styles={{container: (def) => ({...def, flex: 2})}}
                filterOption={(option, inputValue) => {
                    return (
                        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.value.toLowerCase().includes(inputValue.toLowerCase())
                    )
                }}
                options={
                    GameDataService.getResults().map(result => ({
                        label: result,
                        value: result
                    }))
                }
            />
        </Flex>
    )
}

export const SurvivorInput: React.FC = () => {
    return (
        <>
            <SingleSurvivorInput defaultSurvivor="Dwight Fairfield" survivorIndex={0} />
            <SingleSurvivorInput defaultSurvivor="Meg Thomas" survivorIndex={1} />
            <SingleSurvivorInput defaultSurvivor="Claudette Morel" survivorIndex={2} />
            <SingleSurvivorInput defaultSurvivor="Jake Park" survivorIndex={3} />
        </>
    )
}