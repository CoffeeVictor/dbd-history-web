import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';

const Dashboard: NextPage = () => {

	const route = useRouter();

	const {data, status} = useSession({
		required: true,
		onUnauthenticated: () => {
			route.push('/login');
		}
	});

	return (
		<>
			<h1>Dashboard</h1>
			<h2>
				<p>Status: {status}</p>
				<p>Data: ({JSON.stringify(data)})</p>
			</h2>
			<button onClick={() => {
				signOut()
			}}>
				Logout
			</button>
		</>
	);
};

export default Dashboard;
