import { Box, Button, Flex } from "@chakra-ui/react";
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
    id: string;
}

export const MatchCard: React.FC<IMatchCardProps> = (props) => {

    const {killer, map, survivors, created_at, id} = props;

    const dateView = new Date(created_at);

    function handleDelete(id: string) {
        console.log('Deleting:', id)
    }

    return (
        <Flex 
            bg={'gray.300'} 
            borderRadius={'md'} 
            alignItems={'center'} 
            justifyContent={'space-between'} 
            py={'2'} 
            my={'3'} 
            px={'8'}
            minW={'fit-content'}
        >
            <Flex w={'60%'} alignItems={'center'} justifyContent={'space-around'}>
                <Flex align={'center'} justifyContent={'center'} minWidth={'58px'} minHeight={'80px'}>
                    <Image src={`/killers/${killer.title}.webp`} alt={killer.title} width={"58px"} height={"80px"}/>
                </Flex>
                {survivors.map(({name, result}, index) => <SurvivorCard key={index} name={name} result={result}/>)}
            </Flex>
            <Box w={'25%'}>
                {`${map.realm}: ${map.name}`}
            </Box>
            <Box w={'15%'}>
                Date: {dateView.toLocaleDateString()}
            </Box>
            <Button colorScheme={'red'} onClick={() => {handleDelete(id)}}>
                Delete
            </Button>
        </Flex>
    )
}