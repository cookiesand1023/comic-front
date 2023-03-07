import { chakra, Flex, Stack, Avatar, Heading, FormControl, InputGroup, InputLeftElement, Input, InputRightElement, Button, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai"

const CFaUserAlt = chakra(FaUserAlt);
const CFaMail = chakra(AiFillMail)
const CFaLock = chakra(FaLock);

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

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
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius="lg"
              >
                <Box textAlign='center'>
                  <Avatar size='lg' bg="gray.500" my={2} />
                  <Heading pb={3} size='md' textAlign='left'>Sign Up</Heading>
                </Box>
                <FormControl>
                  <Text textAlign="left" fontSize='xs' mb={1}>
                    Email
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <CFaMail color='gray.300'/>
                    </InputLeftElement>
                    <Input type="email" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <Text textAlign="left" fontSize='xs' mb={1}>
                    UserName
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input type="email" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <Text textAlign="left" fontSize='xs' mb={1}>
                    Password
                  </Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <CFaLock color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {/* <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText> */}
                </FormControl>
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
      </Flex>
    </>
  )
}