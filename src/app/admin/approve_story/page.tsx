import React from 'react';
import { Stories } from '@prisma/client';

import ApproveStoryItem from '@/components/UI/ApproveStoryItem';
import Link from 'next/link';
import getUnapprovedStories from '@/libs/getUnapprovedStories';
import PageInnerWrapper from '@/components/PageInnerWrapper';

const ApproveStoryPage = async () => {
  const storiesData: Promise<Stories[]> = getUnapprovedStories();

  if (!storiesData) return;

  const stories = (await storiesData) || [];

  return (
    <PageInnerWrapper
      headerLabel="Истории на проверке"
      headerDescription="Список историй, нуждающихся в проверке"
      padding
    >
      {!stories.length ? (
        <div className="w-full h-full flex flex-col justify-center items-center px-2">
          <p className="text-center flex flex-col gap-4">
            <span className="font-bold md:text-3xl text-lg">Похоже, что все истории проверены</span>
            <span className="md:text-lg text-sm">
              В базе данных ничего не найдено, во всяком случае 😁
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

export default ApproveStoryPage;
