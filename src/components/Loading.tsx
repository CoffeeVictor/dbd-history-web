import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Loading: React.FC = () => {

    const [dots, setDots] = useState(0);

    useEffect(() => {
        const to = setTimeout(() => {
            setDots((dots + 1) % 4);
        }, 500);

        return clearTimeout(to);
    }, [dots]);

    return (
        <Center w={'100vw'} h={'100vh'} bg={'gray.800'}>
            <Flex flexDir="column" alignItems={'center'}>
                <Spinner color="gray.100" w={'32'} h={'32'}/>
                <Flex w={'full'}>
                    <Text color={'gray.100'} mt={'5'} fontSize={'4xl'}>
                        Loading
                    </Text>
                    <Text color={'gray.100'} mt={'5'} fontSize={'4xl'} w={'30px'}>
                        {'.'.repeat(dots)}
                    </Text>
                </Flex>
            </Flex>
        </Center>
    )
}