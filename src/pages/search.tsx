import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Box, Button, Center, Container, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {AuthContext, baseAxios, verifyToken} from "@/pages/_app";
import Link from "next/link";
import ComicCardList from "@/component/ComicCardList";
import {parseCookies} from "nookies";

const inter = Inter({ subsets: ['latin'] })

type Comic = {
    id: string
    title: string

    author: string
    image_url: string
    volume: number
}

const getAllComics = async (): Promise<Comic[]> => {
    return await baseAxios.get("/comics", {
        withCredentials: true
    })
}

export default function Index() {
    const authCtx = useContext(AuthContext)
    const [ comics, setComics ] = useState<Comic[] | null>()

    useEffect( () => {
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
            })
        }
        getAllComics().then((res) => {
            setComics(res.data)
        })
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
                    backgroundColor={"#FFFFFF"}
                >
                    <HStack>
                        <Box
                            w='48%'
                            h='29px'
                            borderRadius='2xl'
                        >
                            <Link href="/">
                                <Center fontSize={'base'} mb={0} h='100%' p={2} ps={6}>
                                    ライブラリ
                                </Center>
                            </Link>

                        </Box>
                        <Box
                            w='52%'
                            borderRight='1px'
                            h='29px'
                            borderColor='gray.200'
                            justifyContent='center'
                            boxShadow="base"
                            borderRadius='2xl'
                            backgroundColor='blackAlpha.800'
                            ms={'auto'}
                        >
                            <Center textAlign={'center'} color={"white"} fontSize={'base'} mb={0} h='100%' p={2}>
                                探す
                            </Center>
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