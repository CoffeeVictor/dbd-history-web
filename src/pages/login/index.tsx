import type { NextPage } from 'next';
import styles from './styles.module.scss';
import { FaGoogle } from 'react-icons/fa';
import { useSession, signIn } from 'next-auth/react';

const Login: NextPage = () => {
	const { data: session } = useSession();

	if (session) {
		console.log('Session:', session);
	}

	async function handleSignIn() {
		console.log('Session:', session);

		const user = await signIn('google', {
			redirect: false,
		});

		console.log('User:', user);
		console.log('Session:', session);
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1 className={styles.title}>
					Dead by Daylight {'\n'}
					Match History
				</h1>
				<h2 className={styles.subtitle}>Keep track of your matches</h2>
				<div className={styles.buttonContainer}>
					<FaGoogle />
					<button onClick={handleSignIn}>Sign In with Google</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
