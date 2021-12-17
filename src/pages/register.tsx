import { Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Loading } from "../components/Loading";
import { IUserCredentials } from "../services/UserService";

const Register: NextPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const {register, handleSubmit} = useForm();
    const router = useRouter();
    const toast = useToast({position: 'top-right', duration: 2500})
    const {data, status} = useSession();

    if(status === 'loading') return <Loading />;

    if(data?.user) router.push('/');

    async function registerUser(formData: IUserCredentials) {

        setUserAlreadyExists(false);

        try {
            const apiResponse = await axios.post('/api/user', formData);

            if(apiResponse.status === 201) {

                toast({
                    title: 'Registed!',
                    description: 'Trying to Log In, please wait.'
                })

                await signIn('dbdh-credentials-provider', {redirect: false, username: formData.username, password: formData.password});

                router.push('/')
            }
        } catch (err) {

            const responseError = err as AxiosError;

            if(responseError.response?.status === 409) {
                setUserAlreadyExists(true)
            } else {
                toast({
                    title: 'Error',
                    description: 'Something went wrong.',
                    status: 'error'
                })
            }
        }
    }

    return (
        <Center bg={'gray.800'} w={'100vw'} height={'100vh'}>
            <Flex
                px={'10'}
                py={'5'} 
                as={'form'} 
                bg={'gray.600'} 
                borderRadius={15} 
                flexDir={'column'} 
                alignItems={'center'} 
                justifyContent={'space-evenly'}
                onSubmit={handleSubmit(registerUser)}
            >
                <Heading my={5}>Create a new account</Heading>
                <FormControl my={15} isRequired isInvalid={userAlreadyExists}>
                    <FormLabel color={'gray.100'} id="field-1-label" htmlFor="field-1">
                        Username
                    </FormLabel>
                    <Input 
                        placeholder="Otzdarva"
                        color={'gray.100'}
                        id="field-1"
                        {...register('username')}
                    />
                    <FormErrorMessage>
                        Username taken, try something else.
                    </FormErrorMessage>
                </FormControl>
                <FormControl my={15} isRequired>
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
                </FormControl>
                <Flex px={'3'} py={'3'} w={'full'} alignItems={'center'} justifyContent={'center'} wrap={'wrap'}>
                    <Button
                        mx={'6'} my={'2'}
                        type="submit"
                        onClick={() => {
                        router.push('/register')
                    }}>Register</Button>
                </Flex>
            </Flex>
        </Center>
    )
}

export default Register;