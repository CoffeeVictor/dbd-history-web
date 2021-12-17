import { Box, Flex, Image } from "@chakra-ui/react";
//import Image from 'next/image';

export interface ISurvivorCardProps {
    name: string;
    result: string;
}

export const SurvivorCard: React.FC<ISurvivorCardProps> = (props) => {

    const {name, result} = props;

    return (
        <Box dir="column">
            <Box>
                <Flex bgImage={`url('/survivors/${name}.webp')`} width={"58px"} height={"80px"} justifyContent={'center'} alignItems={'flex-end'}>
                    <Image src={`/icons/${result}.png`} alt={result} width={"32px"} height={"32px"}/>
                </Flex>
            </Box>
            {/* <Text>
                {result}
            </Text> */}
        </Box>
    )
}