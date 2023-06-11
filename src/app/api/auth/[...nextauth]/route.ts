import NextAuth from 'next-auth';
import { authOptionsLib } from '@/libs/authOptionsLib';

const handler = NextAuth(authOptionsLib);
export { handler as GET, handler as POST };
