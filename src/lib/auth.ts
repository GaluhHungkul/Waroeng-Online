import { NextAuthOptions } from "next-auth";
import GoogleProviders from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

import ConnectToDatabase from "./ConnectToDatabase";
import User from "@/models/User";
import { compare } from "bcrypt";

export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProviders({
            clientId : process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret : process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : { label : "Email", type : "email" },
                password : { label : "Password", type : "password" },
            },
            async authorize(credentials) {
                try {
                    await ConnectToDatabase()
                    
                    if(!credentials) return null
                    const { email, password } = credentials

                    const user = await User.findOne({ email })
                    if(!user) return null
                    
                    const isValidPassword = await compare(password, user.password)
                    if(!isValidPassword) return null
                  
                    return {
                        id : user._id.toString(),
                        username : user.username, 
                        email : user.email,
                        role : user.role,
                        isMember : user.isMember,
                    }

                } catch (error) {
                    console.log("Error : " , error) 
                    return null
                }
            }
        })        
    ],
    secret : process.env.NEXTAUTH_SECRET,
    session : {
        strategy : "jwt"
    },
    callbacks : {
        async signIn({ account, user }) {
            await ConnectToDatabase()
            if(account?.provider === "google") {
                const isUserExist = await User.findOne({ email : user.email })
                if(!isUserExist) {
                    await User.create({
                        email : user.email,
                        username: user.name ?? user.email?.split("@")[0],
                        oauthProvider : "google",
                    })
                }
            }
            return true
            
        },
        async jwt({ token, user, trigger }) {
            
            
            if(trigger === "update" && token?.id) {
                await ConnectToDatabase()
                const currUser = await User.findById(token.id)
                if(currUser) {
                    token.username = currUser.username
                    token.role = currUser.role
                    token.isMember = currUser.isMember
                }
            }
            
            if(!user?.email) return token
            
            await ConnectToDatabase()
            const currUser = await User.findOne({ email : user.email })
            if(!currUser) return token

            const { _id, email, username, role, isMember } = currUser
            token.id = _id.toString()
            token.email = email
            token.username = username
            token.role = role
            token.isMember = isMember          

            return token
        },
        async session({ token : { id, username, email, role, isMember }, session }) {
            if(session.user) {
                session.user.id = id
                session.user.username = username
                session.user.email = email
                session.user.role = role
                session.user.isMember = isMember
            }
            return session
        }
    }
}