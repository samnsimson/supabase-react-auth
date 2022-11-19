import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

interface Props extends ButtonProps {}

/**
 * It's a React component that renders a button with some custom styling
 * @param  - PropsWithChildren<Props>
 * @returns A button element with the className of the props passed in.
 */
export const CustomButton = ({
    className,
    children,
    ...rest
}: PropsWithChildren<Props>): ReactElement<HTMLButtonElement> => {
    return (
        <Button variant="contained" disableElevation className={`rounded-lg py-3 ${className}`} {...rest}>
            {children}
        </Button>
    );
};
