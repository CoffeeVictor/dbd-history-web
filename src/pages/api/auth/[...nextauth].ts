import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { UserService } from '../../../services/UserService';

export interface ISessionUser {
	id: string;
	username: string;
}

export default NextAuth({
	providers: [
		CredentialsProvider({
			id: 'dbdh-credentials-provider',
			name: 'Credentials',
			type: 'credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'Some username'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '*******'
				}
			},
			authorize: async (credentials, req) => {
				const username = credentials?.username;
				const password = credentials?.password;

				if(!username || !password) return null;

				const userService = new UserService();

				const user = await userService.authenticate({username, password});

				return user;
			}
		}),
		GithubProvider({
			
		})
	],
	secret: process.env.NEXT_AUTH_SECRET,
	callbacks: {
		jwt: async ({token, user}) => {
			const newToken = {...token, ...user};
			return newToken
		},
		session: async (params) => {

			let session = params.session;
			let token = params.token

			let newSession = {
				...session,
				user: {
					id: token.id as string,
					username: token.username as string
				}
			};

			return newSession as Session;
		}
	}
});
