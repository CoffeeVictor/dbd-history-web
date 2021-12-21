import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Head from 'next/head';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "../components/Loading";
import { IUserCredentials } from "../services/UserService";

const Login: NextPage = () => {
    const {data, status} = useSession();
    const router = useRouter();
    const {register, handleSubmit} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    if(status === 'loading') return <Loading />;

    if(data?.user) router.push('/');

    async function login(formData: IUserCredentials) {

        setWrongCredentials(false);

        const response = await signIn<"credentials">('dbdh-credentials-provider', {redirect: false, ...formData});

        if(!response?.ok) {
            return setWrongCredentials(true);
        }

        router.push('/')
    }

    return (<>
        <Head>
            <title>Login</title>
        </Head>
        <Box bg={'gray.800'} w={'100vw'} height={'100vh'}>
            <Flex
                alignItems={'center'} 
                justifyContent={'center'}
                h={'full'}
            >
                {/* <Box boxSize={'lg'}>
                    HERO
                </Box> */}
                <Flex
                    px={'10'}
                    py={'5'} 
                    as={'form'} 
                    bg={'gray.600'} 
                    borderRadius={15} 
                    flexDir={'column'} 
                    alignItems={'center'} 
                    justifyContent={'space-evenly'}
                    onSubmit={handleSubmit(login)}
                >
                    <Heading my={5}>Log In with your account</Heading>
                    <FormControl my={15} isRequired isInvalid={wrongCredentials}>
                        <FormLabel color={'gray.100'} id="field-1-label" htmlFor="field-1">
                            Username
                        </FormLabel>
                        <Input 
                            placeholder="Otzdarva"
                            color={'gray.100'}
                            id="field-1"
                            {...register('username')}
                        />
                    </FormControl>
                    <FormControl my={15} isRequired isInvalid={wrongCredentials}>
                        <FormLabel color={'gray.100'} id="field-2-label" htmlFor="field-2">
                            Password
                        </FormLabel>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='*********'
                                color={'gray.100'}
                                id="field-2"
                                {...register('password')}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            Incorrect username or password.
                        </FormErrorMessage>
                    </FormControl>
                    <Flex px={'3'} py={'3'} w={'full'} alignItems={'center'} justifyContent={'center'} wrap={'wrap'}>
                        <Button type="submit" mx={'6'} my={'2'}>Login</Button>
                        <Button
                            mx={'6'} my={'2'}
                            onClick={() => {
                            router.push('/register')
                        }}>Register</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    </>)
}

export default Login;