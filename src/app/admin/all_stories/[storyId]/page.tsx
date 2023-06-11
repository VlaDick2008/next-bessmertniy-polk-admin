'use client';

import React from 'react';
import { Stories } from '@prisma/client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import Header from '@/components/Header';
import { circleCheckIcon, Placeholder, returnIcon, trashIcon } from '@/libs/icons';
import Button from '@/components/UI/Button';
import Loader from '@/components/UI/Loader';
import { toast } from 'react-hot-toast';

const SingleStoryPage = () => {
  const [storyInfo, setStoryInfo] = React.useState<Stories>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isChangingStory, setIsChangingStory] = React.useState(false);

  const router = useRouter();

  const { storyId } = useParams();

  const formatedCreationDate = React.useMemo(() => {
    if (!storyInfo?.createdAt) {
      return null;
    }

    const convertedCreationDate = new Date(storyInfo?.createdAt);

    return format(convertedCreationDate, 'H:mm, PP', { locale: ruLocale });
  }, [storyInfo?.createdAt]);

  const approveStory = () => {
    setIsChangingStory(true);
    axios.put(`/api/admin/story?storyId=${storyId}`, { isVerified: true }).then(() => {
      router.refresh();
      toast.success('Подтверждено!');
      setIsChangingStory(false);
      router.push('/admin/approve_story');
    });
  };

  const cancelApproveStory = () => {
    setIsChangingStory(true);
    axios.put(`/api/admin/story?storyId=${storyId}`, { isVerified: false }).then(() => {
      router.refresh();
      toast('Отмена', {
        icon: '👍',
      });
      setIsChangingStory(false);
      router.push('/admin/approve_story');
    });
  };

  const deleteStory = () => {
    setIsChangingStory(true);
    axios.delete(`/api/admin/story?storyId=${storyId}`).then(() => {
      router.refresh();
      toast('Удалено', {
        icon: '🗑',
      });
      setIsChangingStory(false);
      router.push('/admin/approve_story');
    });
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/admin/story?storyId=${storyId}`)
      .then(({ data }) => setStoryInfo(data))
      .then(() => setIsLoading(false));
  }, [storyId]);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        label={
          storyInfo
            ? `${storyInfo?.subname} ${storyInfo?.name} ${storyInfo?.subsubname}`
            : 'Загрузка...'
        }
        description={storyInfo ? 'Просмотр истории' : 'Загрузка...'}
      />
      {isLoading ? (
        <div className="w-full h-full flex flex-col justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-full md:pt-32 pt-24 px-6 md:flex-row flex-col gap-6 flex">
          <div className="flex flex-col items-center gap-2">
            {!storyInfo?.photo ? (
              <div>
                <Placeholder />
              </div>
            ) : (
              <div className="relative md:min-w-[300px] md:w-[300px] md:h-[380px] w-[200px] h-[280px] rounded-xl overflow-hidden border-2 border-neutral-300">
                <Image src={storyInfo?.photo as string} className="object-cover" fill alt="photo" />
              </div>
            )}
            <p>
              <b>Добавлен:</b> {formatedCreationDate}
            </p>
            <p>
              <b>Проверен:</b>{' '}
              {storyInfo?.isVerified ? (
                <span className="text-emerald-500">Да</span>
              ) : (
                <span className="text-red-500">Нет</span>
              )}
            </p>
            <div className="w-full flex md:flex-col md:justify-normal flex-row justify-center gap-2">
              {storyInfo?.isVerified ? (
                <Button
                  onClick={cancelApproveStory}
                  label="Отменить"
                  disabled={isChangingStory}
                  cancel
                  icon={returnIcon}
                />
              ) : (
                <Button
                  onClick={approveStory}
                  label="Подтвердить"
                  disabled={isChangingStory}
                  approve
                  icon={circleCheckIcon}
                />
              )}
              <Button
                label="Удалить"
                onClick={deleteStory}
                disabled={isChangingStory}
                danger
                icon={trashIcon}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-6">
            <div className="md:text-[56px] text-3xl md:leading-tight font-medium">
              <p>{storyInfo?.subname}</p>
              <p>{storyInfo?.name}</p>
              <p>{storyInfo?.subsubname}</p>
            </div>
            <div>
              <p className="font-bold mb-1 md:text-lg text-base">Информация:</p>
              <p className="md:text-base text-sm">{storyInfo?.info}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleStoryPage;
