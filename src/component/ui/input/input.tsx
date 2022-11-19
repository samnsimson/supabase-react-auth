import React, { AriaAttributes, DetailedHTMLProps, InputHTMLAttributes, ReactElement } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, AriaAttributes {}

/**
 * It's a function that takes in a name, value, placeholder, className, and rest, and returns an input
 * element with the name, placeholder, className, and value set to the values passed in, and the rest
 * of the props set to the rest object
 * @param {Props}  - Props - this is the type of the props that the component will receive.
 * @returns A ReactElement of type HTMLInputElement
 */
export const CustomInput = ({
    name,
    value,
    placeholder,
    className,
    ...rest
}: Props): ReactElement<HTMLInputElement> => {
    return (
        <input
            name={name}
            placeholder={placeholder}
            className={`rounded-lg bg-stone-100 py-3 px-6 ${className}`}
            value={value}
            {...rest}
        />
    );
};
