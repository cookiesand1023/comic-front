import '@/styles/globals.css'
import {ChakraProvider, Flex} from '@chakra-ui/react'
import { AuthProvider } from "@/component/Authentication"
import type {AppContext, AppProps} from 'next/app'
import Layout from './layout'
import {SSRProvider} from "react-aria";
import React, {Context, createContext, useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";
import {GetServerSideProps, NextPageContext} from "next";
// @ts-ignore
import { encycle, decycle } from "json-cyclic"
import {Router, useRouter} from "next/router";
import {parseCookies} from "nookies";

export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const baseAxios = axios.create({
    baseURL: "http://localhost:3200",
    timeout: 10000,
    headers: {},
})

interface MyAppProps extends AppProps {
    isAuthenticated: boolean;
    userInfo: UserInfo | undefined
}

type AuthContextProps = {
    isAuth: boolean
    userInfo: UserInfo | undefined
}

type UserInfo = {
    id: number
    name: string
    age: number
    sex: string
    uuid: string
}

export const AuthContext = createContext<AuthContextProps>({ isAuth: false, userInfo: undefined})

App.getInitialProps = async (ctx: AppContext) => {
    const { req, res, pathname } = ctx.ctx;
    const toAuthenticate = !['/signin', '/signup'].includes(pathname);
    let isAuthenticated = false;
    let userInfo = {
        id: null,
        name: null,
        age: null,
        sex: null,
        uuid: null
    }

    if (req?.cookies?.cg) {
        try {
            const response = await verifyToken(req.headers.cookie);
            if (response.status === 200) {
                isAuthenticated = true;
                userInfo = {
                    id: response.data.ID,
                    name: response.data.name,
                    age: response.data.age,
                    sex: response.data.sex,
                    uuid: response.data.uuid
                }
            }
        } catch (err) {
            console.error('Failed to verify token:', err);
        }
    }

    if (toAuthenticate && !isAuthenticated) {
        res?.writeHead(302, { Location: '/signin' });
        res?.end();
    } else if (!toAuthenticate && isAuthenticated) {
        res?.writeHead(302, { Location: '/' });
        res?.end();
    }

    return decycle({ ...ctx.ctx, isAuthenticated, userInfo });
}

export const verifyToken = async (cookie: any): Promise<boolean> => {
    return await baseAxios.get("/auth/verify", {
        headers: { "Cookie": cookie },
        withCredentials: true
    })
}

export default function App(props: MyAppProps) {
    const {isAuthenticated, pageProps, Component} = props

    return (
            <ChakraProvider>
                <AuthContext.Provider value={{isAuth: isAuthenticated, userInfo: props.userInfo}}>
                    <Layout>
                        <Flex
                            flexDirection="column"
                            width="100wh"
                            height="100vh"
                            justifyContent="top"
                            alignItems="center"
                        >
                        <p>{props.userInfo?.name}</p>
                        <Component {...pageProps} />
                        </ Flex>
                    </Layout>
                </AuthContext.Provider>
            </ChakraProvider>
    )
}
