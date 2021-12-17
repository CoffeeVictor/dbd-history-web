import { Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Form } from "@unform/web";
import { KillerInput } from "./KillerInput";
import { MapInput } from "./MapInput";
import { SurvivorInput } from "./SurvivorInput";

export interface ICreateMatchFormProps {
    isOpen: any;
    onClose: any;
}

export const CreateMatchForm: React.FC<ICreateMatchFormProps> = (props) => {

    const {isOpen, onClose} = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={(data) => {
            console.log('Form Input Data:', data);
        }}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add a new Match</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                    <Flex 
                        flexDir={'column'}
                    >
                        <FormControl>
                            <FormLabel>
                                Killer
                            </FormLabel>
                            <KillerInput />
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Survivors
                            </FormLabel>
                            <SurvivorInput />
                        </FormControl>
                        <FormControl>
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
                <Button colorScheme={'red'}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Form>
      </Modal>
    )
}