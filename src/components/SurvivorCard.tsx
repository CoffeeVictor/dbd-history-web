import { Box, Text } from "@chakra-ui/react";
import Image from 'next/image';

export interface ISurvivorCardProps {
    name: string;
    result: string;
}

export const SurvivorCard: React.FC<ISurvivorCardProps> = (props) => {

    const {name, result} = props;

    return (
        <Box dir="column">
            <Box>
                <Image src={`/survivors/${name}.webp`} alt={name} width={"58px"} height={"80px"} />
            </Box>
            <Text>
                {result}
            </Text>
        </Box>
    )
}