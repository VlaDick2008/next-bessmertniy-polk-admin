import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const storiesToBeApproved = await prismaClient.stories.findMany({
    where: {
      isVerified: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(storiesToBeApproved);
}
