import ComicCard from "@/component/ComicCard";
import {SimpleGrid} from "@chakra-ui/react";


const ComicCardList = ({comics}: any) => {
    return (
        <SimpleGrid columns={[2, 3, 4]} gap={6}>
            {comics?.map((comic: any, i: number) => {
                return (
                    <ComicCard
                        id={comic.ID}
                        key={i}
                        title={comic.title}
                        author={comic.author}
                        imageUrl={comic.image_url}
                        volume={comic.volume}
                        isRead={false}
                        willRead={false}
                    />
                )
            })}
        </SimpleGrid>
    )
}

export default ComicCardList