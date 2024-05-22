import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getTweets } from "../api/tweets";
import { Loader } from "../components/Loader";
import { AddTweet } from "../components/AddTweet";
import { TitleFeed } from "../components/TitleFeed";
import { TweetsCard } from "../components/TweetsCard";

export const Feed = () => {
    const { ref, inView } = useInView();

    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ["tweets"],
        ({ pageParam }) => getTweets({ pageParam }),
        {
            getNextPageParam: (lastPage) => lastPage.meta.next,
        }
    );

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) return <Loader />

    return (
        <>
            <TitleFeed title="Inicio"/>
            <AddTweet />
            {data?.pages?.map((page) => (
                page?.data?.map((t) => ( 
                    <TweetsCard key={t.id} t={t} user={t} />
                ))
            ))}
            {!isLoading && data?.pages?.every((page) => page.data.length === 0) && (
                <p className="mt-5 text-center text-neutral-500">No se encontraron resultados</p>
            )}
            {hasNextPage && (
                <div ref={ref}>
                    {isLoading || isFetchingNextPage ? (
                        <div className="flex h-screen items-center justify-center">
                            <Loader />
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
};
