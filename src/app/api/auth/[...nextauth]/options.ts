import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from '@/model/User'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            id: "Credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
            try {
                    await dbConnect
                    const user = await UserModel.findOne(
                        {
                            $or: [
                                {
                                    email: credentials.identifier
                                },
                                {
                                    username: credentials.identifier
                                }
                            ]
                        })
    
                    if (!user) {
                        throw new Error('No user fount with this email')
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify you account')
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
    
                    if (!isPasswordCorrect) {
                        throw new Error('Invalid password')
                    }
                    return user
            } catch (error) {
                
            }

            }
        })
    ],
    pages: {
        signIn: '/sign-in'
    },
    session:{
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}