import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {
    Box,
    Center,
    Container, Flex,
    HStack, Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react'
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {AuthContext, baseAxios, verifyToken} from "@/pages/_app";
import Link from "next/link";
import ComicCardList from "@/component/ComicCardList";
import {useRouter} from "next/router";
import {parseCookies} from "nookies";

const inter = Inter({ subsets: ['latin'] })

type RegisteredComic = {
    id: string
    title: string

    author: string
    image_url: string
    volume: number
}

const getRegisteredComics = async (uid: any): Promise<RegisteredComic[]> => {
    return await baseAxios.get(`/user_comic/is_read?uid=${uid}`, {
        withCredentials: true
    })
}

export default function Index() {
    const [comics, setComics] = useState<RegisteredComic[] | null>()
    const authCtx = useContext(AuthContext)
    const { pathname } = useRouter()

    useEffect(() => {
        const cookies = parseCookies()
        if (cookies['cg']) {
            verifyToken(document.cookie).then(r => {
                authCtx.userInfo = {
                    id: r.data.ID,
                    age: r.data.age,
                    name: r.data.name,
                    sex: r.data.sex,
                    uuid: r.data.uuid,
                }
                getRegisteredComics(authCtx.userInfo?.id).then((res) => {
                    setComics(res.data)
                })
            })
        }
    }, [])
    return (
        <>
            <Container maxW={{sm: '60%', lg: '55%'}} mt={12}>
                <Box
                    w='100%'
                    border='1px'
                    h='30px'
                    borderColor='gray.300'
                    justifyContent='center'
                    boxShadow="base"
                    borderRadius='2xl'
                    backgroundColor={'white'}
                >
                    <HStack>
                        <Box
                            w='52%'
                            borderRight='1px'
                            h='29px'
                            borderColor='gray.200'
                            justifyContent='center'
                            boxShadow="base"
                            borderRadius='2xl'
                            backgroundColor='blackAlpha.800'
                        >
                            <Center textAlign={'center'} color={"white"} fontSize={'base'} mb={0} h='100%' p={2}>
                                ライブラリ
                            </Center>
                        </Box>
                        <Box
                            w='48%'
                            h='29px'
                            borderRadius='2xl'
                        >
                            <Link href="/search">
                                <Center fontSize={'base'} mb={0} h='100%' p={2} pe={6}>
                                    探す
                                </Center>
                            </Link>
                        </Box>
                    </HStack>
                </Box>
            </Container>
            <Container maxW={{sm: '80%', lg: '55%'}} mt={12} pb={40}>
                <ComicCardList comics={comics}/>
            </Container>
        </>
    )
}
