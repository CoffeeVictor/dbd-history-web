import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { CreateMatchForm } from '../components/CreateMatchForm';
import { Loading } from '../components/Loading';
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

		setMatches(data.matches);
	}

	useEffect(() => {
		getMatchesData();
	}, [])

	if(status === 'loading') return <Loading />;

	return (
		<>
		<Head>
            <title>DbD Tracker</title>
        </Head>
			<CreateMatchForm isOpen={isOpen} onClose={(reload: boolean) => {
				if(reload) {
					getMatchesData();
				}
				onClose();
			}} />
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
					{matches.length > 0 && matches.map((match) => (
							<MatchCard 
								key={match.id} 
								{...match}
								deleteCb={(reload) => {
									if(reload) {
										getMatchesData();
									}
								}}
							/>
						)
					)}
				</Box>
			</Flex>
		</>
	);
};

export default Dashboard;
