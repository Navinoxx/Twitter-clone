import { useField } from "formik";

export const CustomInputField = ({ ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="my-3">
            <input
                {...field}
                {...props}
                className={`
                    border-b-[1px] 
                    border-neutral-800 
                    w-full
                    p-5
                    my-2 
                    cursor-pointer 
                    bg-transparent outline-neutral-800 
                    ${meta.touched && meta.error ? 'border-red-500' : ''}
                    ${meta.touched && !meta.error ? 'border-green-500' : ''}
                `}
                autoComplete="off"
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500">{meta.error}</div>
            ) : null}
        </div>
    );
};