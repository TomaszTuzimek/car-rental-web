import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../pages/actions/authAction"; // Your custom method
import { compare } from "bcryptjs";
import { prisma } from './prisma-client';
import { authSchema } from '../components/model/authSchema';

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(creds) {
        if (!creds) {
          return null;
        }
          const validated = authSchema.safeParse(creds);
          if (!validated.success) {
            return null;
          }
          const {email, password} = validated.data;

          const user = await getUserByEmail(email);
          
          if (!user || !(await compare(password, user.password))) {
            return null;
          }
  
          return user;
        }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt ({token, user}){
      if(user){
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({session, token}){
      if(token){
        session.user.isAdmin = token.isAdmin; 
      }
      return session;
    }

  }
};