import { useQueryClient, useMutation } from "@tanstack/react-query";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { bookmark } from "../api/tweets";
import PropTypes from "prop-types";

export const Bookmark = ({ t }) => {
    const queryClient = useQueryClient()

    const bookmarkMutation = useMutation({
        mutationFn: bookmark,
        onSuccess: () => {
            queryClient.invalidateQueries('tweets')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <div className="flex col-span-1 items-center hover:text-blue-700">
            <button onClick={() => bookmarkMutation.mutate(t.id)} className="btn btn-ghost rounded-full hover:bg-blue-700 hover:bg-opacity-20">
                { t.bookmarked ? <GoBookmarkFill color="blue" /> : <GoBookmark color="inherit" />  }
            </button>
        </div>
    );
};

Bookmark.propTypes = {
    t: PropTypes.object.isRequired,
};