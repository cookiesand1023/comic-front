import { Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import {useContext, useEffect} from "react";
import {baseAxios} from "@/pages/_app";

export const testPost = async () => {
    return await baseAxios.get("/test")
}

export default function Header() {
    useEffect(() => {
        testPost().then(() => {
            console.log("OK")
        }).catch((e) => {
            console.log(e)
        })
    }, [])
  return (
    <>
      <Box w='100%' h='70px' p={4} color='white' bgGradient='linear(to-b, teal.500, teal.400)' boxShadow='base'>
        <Text fontSize='2xl'>ComicLib</Text>
      </Box>
    </>
  )
}

