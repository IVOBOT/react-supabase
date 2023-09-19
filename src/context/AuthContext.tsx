import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../services/client";
import { AuthResponse, User } from "@supabase/supabase-js";

type AuthContextType = {
    auth: boolean;
    user: User | null;
    signIn: (credentials: { email: string, password: string }) => Promise<AuthResponse>;
    signUp: (credentials: { email: string, password: string }) => Promise<AuthResponse>;
    signOut: () => Promise<any>;
    passwordReset: (email:string) => Promise<any>;
    updatePassword: (updatedPassword:string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
    auth: false,
    user: null,
    signIn: (credentials: { email: string, password: string }) => Promise.resolve(signIn(credentials)),
    signUp: (credentials: { email: string, password: string }) => Promise.resolve(signUp(credentials)),
    signOut: () => Promise.resolve(),
    passwordReset: (email:string) => Promise.resolve(),
    updatePassword: (updatedPassword:string) => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

const signUp = (credentials: { email: string, password: string }) => supabase.auth.signUp(credentials)

const signIn = (credentials: { email: string, password: string }) =>  supabase.auth.signInWithPassword(credentials);

const signOut = () => supabase.auth.signOut();

const passwordReset = (email:string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "" // To do
  });

const updatePassword = (updatedPassword:string) =>
  supabase.auth.updateUser({ password: updatedPassword });

type Props = {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        const { user: currentUser } = data;
        setUser(currentUser ?? null);
        setAuth(currentUser ? true : false);
        setLoading(false);
        };
        getUser();
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            //console.log(event)
            if (event === "PASSWORD_RECOVERY") {
                setAuth(false);
            } else if (event === "SIGNED_IN" && session) {
                setUser(session.user);
                setAuth(true);
            } else if (event === "SIGNED_OUT") {
                setAuth(false);
                setUser(null);
            }
        });
        return () => {
            data.subscription.unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                user,
                signIn,
                signUp,
                signOut,
                passwordReset,
                updatePassword
            }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;