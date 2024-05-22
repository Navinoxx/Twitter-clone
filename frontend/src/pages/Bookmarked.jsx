import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTweets } from "../api/tweets";
import { Loader } from "../components/Loader";
import { TitleFeed } from "../components/TitleFeed";
import { TweetsCard } from "../components/TweetsCard";

export const Bookmarked = () => {
    const { ref, inView } = useInView();

    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useInfiniteQuery(["tweets"], getTweets, {
        getNextPageParam: (lastPage) => lastPage.meta.next,
        });

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    return (
        <>
            <TitleFeed title="Guardados"/>  
            {data?.pages?.map((page) => (
                page?.data?.map((t) => ( 
                    t.bookmarked &&
                    <TweetsCard key={t.id} t={t} user={t} />
                ))
            ))}
            {!isLoading && data?.pages?.every((page) => page.data.length === 0) && (
                <p className="mt-5 text-center text-neutral-500">No se encontraron resultados</p>
            )}
            {hasNextPage && (
                <div ref={ref}>
                    {isLoading || isFetchingNextPage ? <Loader /> : null}
                </div>
            )}
        </>
    );
};
