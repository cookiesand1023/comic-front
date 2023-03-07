import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from "@/component/Authentication"
import type {AppContext, AppProps} from 'next/app'
import Layout from './layout'
import {SSRProvider} from "react-aria";
import React, {Context, createContext, useEffect, useLayoutEffect} from "react";
import axios from "axios";
import {GetServerSideProps, NextPageContext} from "next";
// @ts-ignore
import { encycle, decycle } from "json-cyclic"
import {Router} from "next/router";

export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const baseAxios = axios.create({
    baseURL: "http://localhost:3200",
    timeout: 10000,
    headers: {},
})

interface MyAppProps extends AppProps {
    isAuthenticated: boolean;
    userInfo: UserInfo | null
}

type AuthContextProps = {
    isAuth: boolean
    userInfo: UserInfo | null
}

type UserInfo = {
    name: string
    age: number
    sex: string
    uuid: string
}

export const AuthContext = createContext<AuthContextProps>({ isAuth: false, userInfo: null})

App.getInitialProps = async (ctx: AppContext) => {
    console.log(ctx.ctx.pathname)
    console.log("getInitialProps開始")
    const { req, res, pathname } = ctx.ctx;
    const toAuthenticate = !['/signin', '/signup'].includes(pathname);
    let isAuthenticated = false;
    let userInfo = null;

    if (req?.cookies?.cg) {
        try {
            const response = await verifyToken(ctx.ctx);
            if (response.status === 200) {
                isAuthenticated = true;
                userInfo = response.data;
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

const verifyToken = async (ctx: AppContext): Promise<boolean> => {
    return await baseAxios.get("/auth/verify", {
        headers: { cookie: ctx.req.headers.cookie },
        withCredentials: true
    })
}

export default function App(props: MyAppProps) {
    const { isAuthenticated, userInfo, pageProps, Component } = props
    return (
        <SSRProvider>
            <ChakraProvider>
                <AuthProvider isAuthenticated={isAuthenticated}>
                    <AuthContext.Provider value={{ isAuth: isAuthenticated, userInfo: userInfo }}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </AuthContext.Provider>
                </AuthProvider>
            </ChakraProvider>
        </SSRProvider>
  )
}
