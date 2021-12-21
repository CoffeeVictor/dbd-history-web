import { Box, Flex, Image } from "@chakra-ui/react";
//import Image from 'next/image';

export interface ISurvivorCardProps {
    name: string;
    result: string;
    isPlayer: boolean;
}

export const SurvivorCard: React.FC<ISurvivorCardProps> = (props) => {

    const {name, result, isPlayer} = props;

    return (
        <Box dir="column">
            <Box p={'1'} border={'2px'} borderColor={isPlayer ? 'green.600' : 'transparent'} borderRadius={'md'}>
                <Flex bgImage={`url('/survivors/${name}.webp')`} width={"58px"} height={"80px"} justifyContent={'center'} alignItems={'flex-end'}>
                    <Image src={`/icons/${result}.png`} alt={result} width={"40px"} height={"40px"}/>
                </Flex>
            </Box>
            {/* <Text>
                {result}
            </Text> */}
        </Box>
    )
}