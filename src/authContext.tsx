import { createContext, ReactComponentElement, ReactElement, useContext, useEffect, useState } from 'react'
import { User, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, app } from "./fb.config"

interface value {
    user: User | null,
    logInUser: () => void,
    logOutUser: () => void,
}

const AuthCont = createContext<User | null>(null)

export const useAuthContext = () => {
    return useContext(AuthCont)
}

export default function authContext({ children }: { children: ReactElement }) {
    const [user, setUser] = useState<null | User>(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])

    const logInUser = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                setUser(res.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const logOutUser = () => {
        signOut(auth)
        setUser(null)
    }

    const value: value = {
        user,
        logInUser,
        logOutUser
    }
    return (
        <AuthCont.Provider value={user}>
            {children}
        </AuthCont.Provider>
    )
}
