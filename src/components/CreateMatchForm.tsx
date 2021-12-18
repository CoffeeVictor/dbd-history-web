import { Button, Flex, FormControl, FormHelperText, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { Form } from "@unform/web";
import axios from "axios";
import { IMatchBody } from "../services/MatchService";
import { KillerInput } from "./KillerInput";
import { MapInput } from "./MapInput";
import { RoleInput } from "./RoleInput";
import { SurvivorInput } from "./SurvivorInput";

export interface ICreateMatchFormProps {
    isOpen: any;
    onClose: any;
}

export const CreateMatchForm: React.FC<ICreateMatchFormProps> = (props) => {

    const {isOpen, onClose} = props;
    const toast = useToast({
        isClosable: true,
        duration: 3000,
        status: 'error',
        position: 'top-right',
    })

    async function handleSubmit(data: IMatchBody) {
        try {
            await axios.post('/api/matches', {match: data});
        } catch(e) {
            toast({
                title: 'Match could not be created',
                description: 'Something went wrong, try again later.'
            })
        }

        onClose(true);
    }

    return (
        <Modal isOpen={isOpen} onClose={() => {onClose(false)}}>
        <Form onSubmit={handleSubmit}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add a new Match</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                    <Flex 
                        flexDir={'column'}
                    >
                        <FormControl p={'2'}>
                            <FormLabel>
                                Role
                            </FormLabel>
                            <RoleInput />
                            <FormHelperText>Your survivor will always be the first.</FormHelperText>
                        </FormControl>
                        <FormControl p={'2'}>
                            <FormLabel>
                                Killer
                            </FormLabel>
                            <KillerInput />
                        </FormControl>
                        <FormControl p={'2'} >
                            <FormLabel>
                                Survivors
                            </FormLabel>
                            <SurvivorInput />
                        </FormControl>
                        <FormControl p={'2'} >
                            <FormLabel>
                                Map
                            </FormLabel>
                            <MapInput />
                        </FormControl>
                    </Flex>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} type="submit">
                    Save
                </Button>
                <Button colorScheme={'red'} onClick={() => {onClose(false)}}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Form>
      </Modal>
    )
}