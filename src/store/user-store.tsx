import { Session } from "@supabase/supabase-js";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUser {
    user: Partial<Session> | null;
    setUser: (user: any) => void;
    removeUser: () => void;
}

export const useUserStore = create<IUser>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: (data) => set(() => ({ user: data })),
                removeUser: () => set({ user: null }),
            }),
            {
                name: "UserStore",
                version: 1,
            }
        )
    )
);
