const useAuth = () => {
    const user = useState("user", () => null)

    const { supabase } = useSupabase()

    supabase.auth.onAuthStateChange((e, session?) => {
        user.value = session?.user || null
    })

    const signup = async (email: string, password: string) => {
        const { error, user: person} = await supabase.auth.signUp({
            email,
            password
        },
            {
            redirectTo : `${window.location.origin}/myProfile`
        })
        if (error) throw error
        return person
    }

    const login = async (email: string, password: string) => {
        const { error, user: person} = await supabase.auth.signIn({
            email,
            password
        })
        if (error) throw error
        return person
    }

    const signout = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) throw error
    }

    return {
        user,
        signup,
        login,
        signout
    }
}

export default useAuth