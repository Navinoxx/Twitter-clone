import { PropTypes } from "prop-types";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { bookmark } from "../api/tweets";

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
        <button onClick={() => bookmarkMutation.mutate(t.id)} className="btn btn-ghost rounded-full hover:bg-blue-700 hover:bg-opacity-20 transition-color">
            { t.bookmarked ? <GoBookmarkFill color="blue" /> : <GoBookmark />  }
        </button>
    );
};

Bookmark.propTypes = {
    t: PropTypes.object.isRequired,
};