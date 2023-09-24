import { PropTypes } from "prop-types";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

export const EmojiPicker = ({ formik }) => {
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const emojiPickerRef = useRef(null);

    const toggleEmojiPicker = () => {
        setIsEmojiPickerVisible((prevState) => !prevState);
    };

    const handleDocumentClick = (e) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
            setIsEmojiPickerVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div className="flex my-auto" ref={emojiPickerRef}>
            <div
                className="btn btn-circle btn-outline btn-sm border-none hover:bg-sky-500 hover:bg-opacity-10"
                onClick={toggleEmojiPicker}
            >
                <HiOutlineEmojiHappy className="flex transition text-sky-500"/>
            </div>
            {isEmojiPickerVisible && (
                <div className="absolute">
                <Picker
                    id="picker"
                    data={data}
                    onEmojiSelect={(emoji) => {
                        formik.setFieldValue("content", formik.values.content + emoji.native);
                        setIsEmojiPickerVisible(false);
                    }}
                />
            </div>
            )}
        </div>
    )   
}

EmojiPicker.propTypes = {
    formik: PropTypes.object
}