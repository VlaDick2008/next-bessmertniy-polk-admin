import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const storyId = searchParams.get('storyId');

  const storyInfo = await prismaClient.stories.findFirst({
    where: {
      id: storyId as string,
    },
  });

  return NextResponse.json(storyInfo);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const body = await req.json();
  const { isVerified } = body;

  const storyId = searchParams.get('storyId');

  const existingStory = await prismaClient.stories.findFirst({
    where: {
      id: storyId as string,
    },
  });

  if (!existingStory) return new NextResponse('Story not found', { status: 404 });

  const updatedStory = await prismaClient.stories.update({
    where: {
      id: storyId as string,
    },
    data: {
      isVerified,
    },
  });

  return NextResponse.json(updatedStory);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const storyId = searchParams.get('storyId');

  const existingStory = await prismaClient.stories.findFirst({
    where: {
      id: storyId as string,
    },
  });

  if (!existingStory) return new NextResponse('Story not found', { status: 404 });

  const deletedStory = await prismaClient.stories.delete({
    where: {
      id: storyId as string,
    },
  });

  return NextResponse.json(deletedStory);
}
