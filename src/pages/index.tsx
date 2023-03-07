import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import {useContext, useEffect} from "react";
import {AuthContext} from "@/pages/_app";

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  const authCtx = useContext(AuthContext)
  useEffect( () => {
    console.log(authCtx.userInfo)
  }, [])
  return (
    <>
      <Container maxW='550px' mt={12}>
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab>One</Tab>
            <Tab>Two</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}
