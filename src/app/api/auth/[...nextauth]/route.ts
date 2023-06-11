import prismaClient from '@/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

// const handler = NextAuth({
//   adapter: PrismaAdapter(prismaClient),
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         password: { label: "Password", type: "password" },
//         username: { label: "Username", type: "text", placeholder: "user" },
//     },
//       async authorize(credentials, req) {
//         if(!credentials.email || !credentials.password) {
//           throw new Error('Please enter an email and password')
//       }
//         // const body = req.body;

//         // const user = await prismaClient.user.findUnique({
//         //   where: { username },
//         // });
//         // if (!user) return null;

//         // const isPasswordValid = await bcrypt.compare(password, user.password);

//         // if (!isPasswordValid) return null;

//         // return user;
//       },
//     }),
//   ],
//   callbacks: {
//     session({ session, token }) {
//       session.user.id = token.id;
//       session.user.username = token.username;
//       return session;
//     },
//     jwt({ token, account, user }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.id = user.id;
//         token.username = (user as User).username;
//         token.id = user.id;
//       }

//       return token;
//     },
//   },
//   pages: {
//     signIn: '/',
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.JWT_KEY,
//   debug: process.env.NODE_ENV === 'development',
// });

// export { handler as GET, handler as POST };

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
        username: { label: 'Username', type: 'text', placeholder: 'user' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const user = await prismaClient.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!user || !user?.password) {
          throw new Error('No user found');
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_KEY,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
