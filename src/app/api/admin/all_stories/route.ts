import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const allStories = await prismaClient.stories.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(allStories);
}
