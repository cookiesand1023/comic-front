import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text, Container, VStack, Input, Box, Avatar, Flex, FormControl, FormHelperText, InputGroup, InputLeftElement, InputRightElement, Link, Stack, chakra } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillMail } from "react-icons/ai";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {SubmitHandler, useForm} from "react-hook-form";
import {baseAxios} from "@/pages/_app";
import {useRouter} from "next/router";

const CFaUserAlt = chakra(FaUserAlt);
const CAiMail = chakra(AiFillMail);
const CFaLock = chakra(FaLock);

type Inputs = {
  email: string,
  password: string,
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const { replace } = useRouter()
  const doSignIn: SubmitHandler<Inputs> = async (data) => {
    await baseAxios.post("/signin", data, { withCredentials: true }).then(() => {
        replace("/")
    }).catch((e) => {
      console.log(e.response.data.message)
    })
  }

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="top"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          pt={{ base: "30", sm: "40" }}
          justifyContent="center"
          alignItems="center"
        >

          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit(doSignIn)}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius="lg"
              >
                <Box textAlign='center'>
                  <Avatar size='lg' bg="teal.500" my={2} />
                  <Heading pb={3} size='md' textAlign='left'>Sign In</Heading>
                </Box>
                <div>
                  <Text textAlign="left" fontSize='xs' mb={1}>
                    Email
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <CAiMail color='gray.300'/>
                    </InputLeftElement>
                    <Input {...register("email", {
                      required: "????????????????????????????????????????????????",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
                        message: "??????????????????????????????????????????????????????????????????",
                      }
                    })}
                           borderColor={errors.email ? "red.300" : null}/>
                  </InputGroup>
                  <Text fontSize='xs' color='tomato' mt={1}>{errors.email?.message}</Text>
                </div>
                <div>
                  <Text textAlign="left" fontSize='xs' mb={1}>
                    Password
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <CFaLock color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "??????????????????????????????????????????",
                        minLength: {
                          value: 8,
                          message: "??????????????????8~20?????????????????????????????????"
                        },
                        maxLength: {
                          value: 20,
                          message: "??????????????????8~20?????????????????????????????????",
                        },
                      })}
                      borderColor={errors.password ?"red.300" : null}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text fontSize='xs' color='tomato' mt={1}>{errors.password?.message}</Text>
                  {/* <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText> */}
                </div>
                <Box pt={8}>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Sign In
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New to us?{" "}
          <Link color="teal.500" href="/signup">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </>
  )
}