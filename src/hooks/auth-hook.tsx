import { Session } from "@supabase/supabase-js";
import { supabase } from "../db";
import { useUserStore } from "../store";

type Props = {};

type SignUpType = {
    email: string;
    password: string;
    phone?: string;
    firstname?: string;
    lastname?: string;
};

type SignInType = {
    email: string;
    password: string;
};

export const useAuth = () => {
    const { setUser, removeUser } = useUserStore();

    /**
     * It creates a new user in the database.
     * @param {SignUpType} credentials - SignUpType
     * @returns A promise that resolves to a session object or null.
     */
    const signUp = (credentials: SignUpType): Promise<Session | null> => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password, firstname, lastname, phone } = credentials;
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { first_name: firstname, last_name: lastname, phone } },
                });
                if (error) throw new Error(error.message);
                setUser({ ...data.session });
                resolve(data.session);
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * It signs in a user with email and password.
     * @param {SignInType} credentials - SignInType - This is the type of the credentials that we are
     * passing in.
     * @returns A promise that resolves to a session object or null.
     */
    const signIn = (credentials: SignInType): Promise<Session | null> => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password } = credentials;
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw new Error(error.message);
                setUser({ ...data.session });
                resolve(data.session);
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * It signs out the user and removes the user from the local storage.
     * @returns A promise that resolves to null.
     */
    const signOut = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await supabase.auth.signOut();
                removeUser();
                resolve(null);
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * It gets the current user from the database.
     * @returns The current user object.
     */
    const getCurrentUser = async () => {
        const { data } = await supabase.auth.getUser();
        if (data) return data.user;
        return null;
    };

    /**
     * `getCurrentSession` is an async function that returns the current session if it exists,
     * otherwise it returns null
     * @returns The current session.
     */
    const getCurrentSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data) return data.session;
        return null;
    };

    return {
        signUp,
        signIn,
        signOut,
        getCurrentUser,
        getCurrentSession,
    };
};
