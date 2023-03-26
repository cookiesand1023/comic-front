import { chakra, Flex, Stack, Avatar, Heading, FormControl, InputGroup, InputLeftElement, Input, InputRightElement, Button, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai"
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {baseAxios} from "@/pages/_app";

const CFaUserAlt = chakra(FaUserAlt);
const CFaMail = chakra(AiFillMail)
const CFaLock = chakra(FaLock);

type Inputs = {
  email: string,
  name: string,
  password: string,
};

type SignupErr = {
  message: string | null,
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const { replace } = useRouter()
  const [ signUpErrMsg, setSignUpErrMsg ] = useState<SignupErr>({message: null})

  const doSignUp: SubmitHandler<Inputs> = async (data) => {
    await baseAxios.post("/signup", data, { withCredentials: true }).then(() => {
      location.href = "/"
    }).catch((e) => {
      setSignUpErrMsg({ message: "ユーザー登録に失敗しました" })
      console.log(e.response.data.message)
    })
  }

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <>
      {/*<Flex*/}
      {/*  flexDirection="column"*/}
      {/*  width="100wh"*/}
      {/*  height="100vh"*/}
      {/*  backgroundColor="whiteAlpha.900"*/}
      {/*  justifyContent="top"*/}
      {/*  alignItems="center"*/}
      {/*>*/}
        <Stack
          flexDir="column"
          mb="2"
          pt={{ base: "30", sm: "40" }}
          justifyContent="center"
          alignItems="center"
        >

          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit(doSignUp)}>
              <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="xl"
                  borderRadius="lg"
                  border="1px"
                  borderColor="gray.200"
              >
                <Box textAlign='center'>
                  <Avatar size='lg' bg="gray.500" my={2} />
                  <Heading pb={3} size='md' textAlign='left'>Sign Up</Heading>
                </Box>
                <Text textAlign='center' fontSize='xs' color='tomato' mt={1}>{signUpErrMsg?.message}</Text>
                <div>
                  <Text textAlign="left" fontSize='xs' mb={1}>
                    Email
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <CFaMail color='gray.300'/>
                    </InputLeftElement>
                    <Input {...register("email", {
                      required: "メールアドレスを入力してください",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
                        message: "メールアドレスを正しい形式で入力してください",
                      }
                    })}
                           borderColor={errors.email ? "red.300" : null}/>
                  </InputGroup>
                  <Text fontSize='xs' color='tomato' mt={1}>{errors.email?.message}</Text>
                </div>
                <div>
                  <Text textAlign="left" fontSize='xs' mb={1}>
                    UserName
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input
                        {...register("name", {
                          required: "ユーザーネームを入力してください",
                          maxLength: {
                            value: 20,
                            message: "ユーザーネームは20文字以内で入力してください",
                          },
                        })}
                        borderColor={errors.name ?"red.300" : null}
                    />
                  </InputGroup>
                  <Text fontSize='xs' color='tomato' mt={1}>{errors.name?.message}</Text>
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
                          required: "パスワードを入力してください",
                          minLength: {
                            value: 8,
                            message: "パスワードは8~20文字で入力してください"
                          },
                          maxLength: {
                            value: 20,
                            message: "パスワードは8~20文字で入力してください",
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
                    Sign Up
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already registered?{" "}
          <Link color="teal.500" href="/signin">
            Sign In
          </Link>
        </Box>
      {/*</Flex>*/}
    </>
  )
}