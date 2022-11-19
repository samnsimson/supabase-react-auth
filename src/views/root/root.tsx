import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../../hooks";

type Props = {};

export const RootView = (props: Props) => {
    const { signOut, getCurrentUser } = useAuth();

    useEffect(() => {
        getCurrentUser().then((user) => console.log("CURRENT USER", user));
    }, []);

    return (
        <div>
            RootView
            <Button onClick={() => signOut()}>Sign out</Button>
        </div>
    );
};
