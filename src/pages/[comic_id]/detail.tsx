import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {
    Box, Button,
    Center,
    Container,
    HStack, Image, Stack, Text, VStack,
} from '@chakra-ui/react'
import {useContext, useEffect, useState} from "react";
import {AuthContext, baseAxios} from "@/pages/_app";
import {useRouter} from "next/router";

const inter = Inter({ subsets: ['latin'] })

type Comic = {
    title: string

    author: string
    image_url: string
    volume: number
}

const getComicDetail = async (comicIdString: string): Promise<Comic> => {
    return await baseAxios.get(`/comic?cid=${comicIdString}`, {
        withCredentials: true
    })
}

export default function Detail() {
    const { query } = useRouter()
    const [ comic, setComic ] = useState<Comic>()
    const comicIdString = Array.isArray(query.comic_id)? query.comic_id[0] : query.comic_id
    const authCtx = useContext(AuthContext)

    useEffect( () => {
        if (comicIdString) {
            getComicDetail(comicIdString).then((res) => {
                setComic(res.data)
            })
        }
        console.log(comic)
    }, [comicIdString])

    return (
        <>
            <Container
                maxW={{ sm: '60%', lg: '50%' }}
                mt={12}
                px={8}
                backgroundColor={"#FFFFFF"}
                minHeight={540}
            >
                <Box
                    borderBottom='1px' borderColor='gray.200'
                >
                    <Text
                        fontWeight={"bold"}
                        fontSize={24}
                        px={4}
                        py={2}
                        mt={8}
                    >
                        {comic?.title}
                    </Text>
                </Box>

                <HStack>
                    <Box width={"30%"}>
                        <Image
                            src={comic ? `/comics/${comic?.image_url}`: ""}
                            mt={8}
                            mb={0}
                            h={380}
                            w={286}
                        />
                    </Box>
                    <Box width={"70%"} h={412}>

                        <Stack spacing={8} mt={8} py={6} px={12}>
                            {/*author*/}
                            <HStack>
                                <Text>著者・作者</Text>
                                <Text>{comic?.author}</Text>
                            </HStack>
                            <HStack>
                                <Text>発売巻数</Text>
                                <Text>{comic?.volume}</Text>
                            </HStack>
                            <HStack>
                                <Text>ジャンル</Text>
                                {/*<Text>{comic?.volume}</Text>*/}
                            </HStack>
                            <HStack>
                                <Text>読者評価</Text>
                                {/*<Text>{comic?.volume}</Text>*/}
                            </HStack>
                            <HStack spacing={8} h={100}>
                                <Button colorScheme='blue' color='white' size='md' borderRadius='20px' w={180}>
                                    読んだ！
                                </Button>
                                <Button colorScheme='green' color='white' size='md' borderRadius='20px' w={180}>
                                    読みたい！
                                </Button>
                            </HStack>
                        </Stack>
                    </Box>
                </HStack>
            </Container>

            {/*<Container maxW={{sm: '80%', lg: '55%'}} mt={12}>*/}
            {/*    <ComicCardList comics={testComicArr}/>*/}
            {/*</Container>*/}
        </>
    )
}