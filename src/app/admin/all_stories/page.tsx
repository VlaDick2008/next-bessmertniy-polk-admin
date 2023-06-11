import React from 'react';
import { Stories } from '@prisma/client';
import getAllStories from '@/libs/getAllStories';

import Header from '@/components/Header';
import ApproveStoryItem from '@/components/UI/ApproveStoryItem';
import Link from 'next/link';
import PageInnerWrapper from '@/components/PageInnerWrapper';

const AllStoriesPage = async () => {
  const storiesData: Promise<Stories[]> = getAllStories();

  if (!storiesData) return;

  const stories = (await storiesData) || [];

  return (
    <PageInnerWrapper padding headerLabel="Все истории" headerDescription="Список всех историй">
      {!stories.length ? (
        <div className="w-full h-full flex flex-col justify-center items-center px-2 ">
          <p className="text-center flex flex-col gap-4">
            <span className="font-bold md:text-3xl text-lg">
              Тут ничего нет. Но как это возможно?
            </span>
            <span className="md:text-lg text-sm">
              Если вы видите это, возможно, в системе что-то пошло не так 🤔 <br /> Попробуйте
              перезагрузить страницу
            </span>
          </p>
        </div>
      ) : (
        <div className="w-full overflow-y-scroll">
          {stories.map((story) => (
            <Link key={story.id} href={`/admin/all_stories/${story.id}`}>
              <ApproveStoryItem
                name={story.name}
                subname={story.subname}
                subsubname={story.subsubname}
                createdAt={story.createdAt}
                isApproved={story.isVerified}
              />
            </Link>
          ))}
        </div>
      )}
    </PageInnerWrapper>
  );
};

export default AllStoriesPage;
