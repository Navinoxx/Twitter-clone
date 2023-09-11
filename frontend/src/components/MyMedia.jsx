import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";

export const MyMedia = ({ tweets }) => {
    const { userId } = useParams();
    
    return (
        <>
            {tweets.map((t) => (
                t.userId === userId && t.image && (
                    <div className="flex flex-row items-start gap-3" key={t.id}>
                        <img src={`${t.image}`} />
                    </div>
                )
            ))}
        </>
    );
}

MyMedia.propTypes = {
    tweets: PropTypes.array.isRequired
};  
