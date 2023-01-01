import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth'
import { useRouter } from "next/router"
import { Children, createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth } from '../firebase'

interface IAuth {
    user: User | null
    signUp: (email:string, password:string) => Promise<void>
    signIn: (email:string, password:string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({children}:AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    // ログイン中のユーザーがいるか確認
    useEffect(() => onAuthStateChanged(auth, (user) => {
        if (user) {
            // ログイン中
            setUser(user)
            setLoading(false)
        } else {
            // ログアウト中
            setUser(null)
            setLoading(true)
            // ログインページにリダイレクト
            router.push('/login')
        }
        setInitialLoading(false)
    }),[auth])

    // 新規登録（ユーザー名の生成からホームページへの遷移
    const signUp = async (email: string, password: string) => {
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    // ログイン認証
    const signIn = async (email: string, password: string) => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    // ログアウト(ログイン中のユーザー情報を削除)
    const logout = async () => {
        setLoading(true)
        signOut(auth).then(() => {
            setUser(null)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    const memoedValue = useMemo(() => ({
        user, signUp, signIn, logout, error, loading
    }), [user, loading, error])

    return <AuthContext.Provider value={memoedValue}>
        {!initialLoading && children}
    </AuthContext.Provider>
}

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth