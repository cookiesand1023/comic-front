import { useRouter } from "next/router";
import {parseCookies} from "nookies";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {baseAxios, useIsomorphicLayoutEffect} from "@/pages/_app";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

type Props = {
    children: React.ReactNode,
    isAuthenticated: boolean
}

export const AuthProvider = ({ children, isAuthenticated }: Props) => {
    const { push, pathname, replace } = useRouter();
    const [completed, setCompleted] = useState<boolean>(false)

    // useEffect( () => {
    //     console.log(isAuthenticated)
    //
    //     if (pathname === "/signin" || pathname === "/signup") {
    //         if (isAuthenticated) {
    //             replace("/")
    //         }
    // //         // if (token && verifyToken())
    // //             setCompleted(true)
    //     } else {
    //         if (!isAuthenticated) {
    //             replace("signin")
    //         }
    // //         if (token === undefined) {
    // //             replace("/signin")
    // //         } else {
    // //             setCompleted(true)
    // //         }
    //     }
    // }, [pathname])

    // if (completed) {
        return <>{children}</>
    // }
    // return <>Redirecting...</>
}

