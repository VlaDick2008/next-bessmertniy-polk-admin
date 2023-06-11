import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prismaClient from '@/libs/prismadb';

export const authOptionsLib: AuthOptions = {
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
