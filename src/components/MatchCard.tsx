import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import axios from "axios";
import Image from 'next/image';
import { SurvivorCard } from "./SurvivorCard";

export interface ISurvivorData {
    name: string;
    result: string;
    isPlayer: boolean;
}

export interface IMatchCardProps {
    killer: {
        title: string;
        isPlayer: boolean;
    }
    map: {
        realm: string;
        name: string;
    }
    survivors: ISurvivorData[];
    created_at: Date;
    id: string;
    deleteCb: (reload: boolean) => void;
}

export const MatchCard: React.FC<IMatchCardProps> = (props) => {

    const {killer, map, survivors, created_at, id, deleteCb} = props;
    const toast = useToast({
        isClosable: true,
        duration: 3000,
        position: 'top-right'
    });
    const dateView = new Date(created_at);

    async function handleDelete(id: string) {
        try {
            await axios.delete(`api/matches/${id}`);

            toast({
                title: 'Match deleted.',
                status: 'success'
            })
        } catch (e) {
            toast({
                title: 'Server error',
                description: 'Something went wrong with the server.',
                status: 'error'
            })
        } finally {
            deleteCb(true);
        }
    }

    return (
        <Flex 
            bg={'gray.300'} 
            borderRadius={'md'} 
            alignItems={'center'} 
            justifyContent={'space-between'} 
            my={'3'} 
            py={'1'}
            pr={'2%'}
            minW={'fit-content'}
        >
            <Flex w={'60%'} alignItems={'center'} justifyContent={'space-around'}>
                <Flex align={'center'} justifyContent={'center'} minWidth={'58px'} minHeight={'80px'} p={'1'} border={'2px'} borderColor={killer.isPlayer ? 'green.600' : 'transparent'} borderRadius={'md'}>
                    <Image src={`/killers/${killer.title}.webp`} alt={killer.title} width={"58px"} height={"80px"}/>
                </Flex>
                {survivors.map(({name, result, isPlayer}, index) => <SurvivorCard key={index} name={name} result={result} isPlayer={isPlayer} />)}
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