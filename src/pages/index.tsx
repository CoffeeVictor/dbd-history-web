import { Box, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { IMatchCardProps, MatchCard } from '../components/MatchCard';

const Dashboard: NextPage = () => {

	const route = useRouter();
	const [matches, setMatches] = useState<IMatchCardProps[]>([]);

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
			<Flex w={'100vw'} h={'100vh'} bg={'gray.800'} flexDir={'column'}>
				<Flex h={'min-content'} justifyContent={'space-between'} p={'2.5'}>
					<Button colorScheme={'green'}>
						Add new match
					</Button>
					<Button 
						onClick={() => {
							signOut();
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
