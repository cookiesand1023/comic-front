import {Box, Button, Card, CardBody, Image, Stack, VStack, Text} from "@chakra-ui/react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useContext} from "react";
import {AuthContext, baseAxios} from "@/pages/_app";

type Props = {
    id: number
    title: string

    author: string
    imageUrl: string
    volume: number
    isRead: boolean
    willRead: boolean
}

const addComicIsRead = async (userId: number, comicId: number) => {
    const data = {
        user_id: userId,
        comic_id: comicId,
        type: "is_read",
        status: true
    }
    return await baseAxios.post(`/user_comic/register`, data,
        {
            withCredentials: true
        })
}

const ComicCard = ({
                       id,
                       title,
                       author,
                       imageUrl,
                       volume,
                       isRead,
                       willRead,
                   }: Props) => {

    const router = useRouter()
    const authCtx = useContext(AuthContext)

    return (
        <>
            <Link href={`/${id}/detail`}>
                <Card boxShadow={'lg'} minHeight={{base: "253", md: "227"}}>
                    <CardBody p={2}>
                        <Image
                            src={`comics/${imageUrl}`}
                            alt='Green double couch with wooden legs'
                            mb={0}
                        />
                    </CardBody>
                </Card>
            </Link>
            {router.pathname === '/search' ?
                <Stack mt={1} px={2}>
                    <Stack h={210} spacing={4}>
                        <Text fontWeight={"bold"} fontSize={16} mt={2}>{title}</Text>
                        <Text fontSize={14} mt={2}>{author}</Text>
                    </Stack>
                    <Stack w={200} mt={'0px !important'} spacing={4}>
                        <Button colorScheme='blue' color='white' size='sm' borderRadius='20px'
                                onClick={async () => {
                                    if (authCtx.userInfo?.id) {
                                        await addComicIsRead(authCtx.userInfo.id, id)
                                    }
                        }}>
                            読んだ！
                        </Button>
                        <Button colorScheme='green' color='white' size='sm' borderRadius='20px'>
                            読みたい！
                        </Button>
                    </Stack>
                </Stack>
                :
                <></>
            }
        </>
    )
}

export default ComicCard