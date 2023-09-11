import { getTweets } from "../api/tweets";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { AddTweet } from "../components/AddTweet";
import { RtBtn } from "../components/RtBtn";
import { TitleFeed } from "../components/TitleFeed";
import { Bookmark } from "../components/Bookmark";
import { formatDate } from "../utils/formatDate";
import { CommentBtn } from "../components/CommentBtn";
import { LikeBtn } from "../components/LikeBtn";

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

    return (
        <>
        <TitleFeed title="Inicio"/>
        <AddTweet />
        {data?.pages?.map((page) => (
                page?.data?.map((t) => ( 
                    <div
                        key={t.id}
                        className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
                    >
                        <div className="flex flex-row items-start gap-3">
                            <div className="avatar">
                                <div className="w-11 bg-black rounded-full">
                                    <img src={`${t.avatar}`} />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-white font-semibold cursor-pointer hover:underline">
                                        <Link to={`/profile/${t.username}`}>{t?.user || t?.username}</Link>
                                    </p>
                                    <span className="text-neutral-500 cursor-pointer hover:underline md:block">
                                        @{t.username}   
                                    </span>
                                    <span className="text-neutral-500 text-sm">
                                    · {formatDate(t.created_at)}
                                    </span>
                                </div>
                                <Link to={`/tweet/${t.id}`}>
                                    <div className="text-white mt-1 text-start break-all">
                                        {t.content}
                                    </div>
                                </Link>
                                <img src={t.image} />
                                <div className="flex items-center mt-3 gap-10">
                                    <div className="flex flex-row items-center text-neutral-500 gap-2 transition hover:text-blue-700">
                                        <CommentBtn t={t} />
                                        <p>{t.parent.length}</p>
                                    </div>
                                    <div className="flex flex-row items-center text-neutral-500 gap-2 transition hover:text-green-700">
                                        <RtBtn t={t} />
                                        <p>{t.retweets_count}</p>
                                    </div>
                                    <div className="flex flex-row items-center text-neutral-500 gap-2 transition hover:text-red-700">
                                        <LikeBtn t={t} />
                                        <p>{t.likes_count}</p>
                                    </div>
                                    <div className="flex flex-row items-center  gap-2 transition hover:text-blue-700">
                                        <Bookmark t={t} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
