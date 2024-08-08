import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import http from "@/services/httpServices";

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/signIn',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
                console.log(baseURL);

                try {
                    const response = await axios.post(`${baseURL}/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    const user = response.data.data;
                    console.log(user);

                    if (user) {
                        http.setJwt(user?.token)
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.firstname,
                            lastName: user.lastname,
                            token: user.token,
                            exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days expiration
                        };
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error: any) {
                    throw new Error(error.response?.data?.message || "An error occurred");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.lastName = user.lastName;
                token.token = user.token;
                token.exp = user.exp;
            }

            // Check token expiration and refresh if needed
            if (Date.now() >= token.exp * 1000) {
                token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // Extend expiration by another 30 days
            }

            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.lastName = token.lastName;
            session.user.token = token.token;
            session.user.exp = token.exp; // Add expiration date to session
            return session;
        },
    },
});

export { handler as GET, handler as POST };
