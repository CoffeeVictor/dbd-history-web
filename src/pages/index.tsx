import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { CreateMatchForm } from '../components/CreateMatchForm';
import { IMatchCardProps, MatchCard } from '../components/MatchCard';

const Dashboard: NextPage = () => {

	const route = useRouter();
	const [matches, setMatches] = useState<IMatchCardProps[]>([]);
	const {isOpen, onOpen, onClose} = useDisclosure();

	const {data, status} = useSession({
		required: true,
		onUnauthenticated: () => {
			route.push('/login');
		}
	});

	async function getMatchesData() {
		const result = await axios.get('api/matches');

		const data = result.data;

		console.log('Setting matches as:', data)

		setMatches(data.matches);
	}

	useEffect(() => {
		getMatchesData();
	}, [])

	return (
		<>
			<CreateMatchForm isOpen={isOpen} onClose={onClose} />
			<Flex w={'100vw'} h={'100vh'} bg={'gray.800'} flexDir={'column'}>
				<Flex h={'min-content'} justifyContent={'space-between'} p={'2.5'}>
					<Button colorScheme={'green'} onClick={onOpen}>
						Add new match
					</Button>
					<Button 
						onClick={() => {
							signOut({callbackUrl:'/login'});
						}}
					>Logout</Button>
				</Flex>
				<Box p={'2.5'}>
					{matches.length > 0 && matches.map((match, index) => (
							<MatchCard 
								key={index} 
								{...match}
							/>
						)
					)}
				</Box>
			</Flex>
		</>
	);
};

export default Dashboard;
