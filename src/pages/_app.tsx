import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../../styles/globals.css';


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={extendTheme({
				fonts: {
					heading: 'Inter',
					body: 'Inter'
				}
			})}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
