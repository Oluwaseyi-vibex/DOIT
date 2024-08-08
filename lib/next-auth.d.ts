// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            lastName: string;
            token: string;
            exp: number; // Add expiration date
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        email: string;
        name: string;
        lastName: string;
        token: string;
        exp: number; // Add expiration date
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name: string;
        lastName: string;
        token: string;
        exp: number; // Add expiration date
        refreshToken: string; // Add refresh token
    }
}
