import React from 'react';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

interface ApproveStoryItemProps {
  name: string;
  subname: string;
  subsubname: string;
  createdAt: Date;
  isApproved: boolean;
}

const ApproveStoryItem: React.FC<ApproveStoryItemProps> = ({
  name,
  subname,
  subsubname,
  createdAt,
  isApproved,
}) => {
  const formatedCreationDate = React.useMemo(() => {
    if (!createdAt) {
      return null;
    }

    const convertedCreationDate = new Date(createdAt);

    return format(convertedCreationDate, 'H:mm, PP', { locale: ruLocale });
  }, [createdAt]);

  return (
    <div className="border-b-2 border-neutral-300 md:p-4 p-2 flex md:flex-row flex-col md:items-center justify-between hover:bg-gray-100 transition">
      <div className="flex md:flex-row flex-col gap-1 md:items-end">
        <div className="flex gap-1">
          <p className="md:text-xl text-sm leading-none">{subname}</p>
          <p className="md:text-xl text-sm leading-none">{name}</p>
          <p className="md:text-xl text-sm leading-none">{subsubname}</p>
        </div>

        <p className="leading-none md:text-base text-xs">
          <span className="font-bold md:border-l-2 md:text-base text-xs border-neutral-300 md:pl-2">
            Добавлен:
          </span>{' '}
          {formatedCreationDate}
        </p>
      </div>
      <p className="md:text-base text-xs">
        <span className="font-bold">Проверен:</span>{' '}
        <span className={isApproved ? 'text-emerald-500' : 'text-red-600'}>
          {isApproved ? 'Да' : 'Нет'}
        </span>
      </p>
    </div>
  );
};

export default ApproveStoryItem;
