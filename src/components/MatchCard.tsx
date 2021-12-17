import { Box, Flex } from "@chakra-ui/react";
import Image from 'next/image';
import { SurvivorCard } from "./SurvivorCard";

export interface ISurvivorData {
    name: string;
    result: string;
}

export interface IMatchCardProps {
    killer: {
        title: string;
    }
    map: {
        realm: string;
        name: string;
    }
    survivors: ISurvivorData[];
    created_at: Date;
}

export const MatchCard: React.FC<IMatchCardProps> = (props) => {

    const {killer, map, survivors, created_at} = props;

    const dateView = new Date(created_at);

    return (
        <Flex bg={'gray.300'} borderRadius={'md'} alignItems={'center'} justifyContent={'space-evenly'}>
            <Box>
                <Image src={`/killers/${killer.title}.webp`} alt={killer.title} width={"58px"} height={"80px"}/>
            </Box>
            {survivors.map(({name, result}, index) => <SurvivorCard key={index} name={name} result={result}/>)}
            <Box>
                {`${map.realm}: ${map.name}`}
            </Box>
            <Box>
                Date: {dateView.toLocaleDateString()}
            </Box>
        </Flex>
    )
}