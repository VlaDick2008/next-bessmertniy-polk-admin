import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, isRootAdmin } = body;

  if (!username || !password) return new NextResponse('Missing fields', { status: 400 });

  const existingUser = await prismaClient.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) return new NextResponse('User allready exist', { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      username,
      password: hashedPassword,
      isRootAdmin,
    },
  });

  return NextResponse.json(user);
}
