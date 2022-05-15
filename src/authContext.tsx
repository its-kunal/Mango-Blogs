import { createContext, ReactComponentElement, ReactElement, useContext, useEffect, useState } from 'react'
import { User, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, app } from "./fb.config"

interface value {
    user: User | null,
    logInUser: () => void,
    logOutUser: () => void,
    loading: boolean
}

const AuthCont = createContext<User | null>(null)

export const useAuthContext = () => {
    return useContext(AuthCont)
}

export default function authContext({ children }: { children: ReactElement }) {
    const [user, setUser] = useState<null | User>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    const logInUser = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                setUser(res.user)
                setLoading(false)
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
        logOutUser,
        loading
    }
    return (
        <AuthCont.Provider value={user}>
            {children}
        </AuthCont.Provider>
    )
}
