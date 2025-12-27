import { createAuthClient } from "better-auth/react"

const baseURL = import.meta.env.DEV ? window.location.origin : import.meta.env.VITE_BASEURL;

export const authClient = createAuthClient({
    baseURL,
    basePath: '/api/auth',
    fetchOptions:{credentials: 'include'},
})

export const { signIn, signUp, useSession } = authClient