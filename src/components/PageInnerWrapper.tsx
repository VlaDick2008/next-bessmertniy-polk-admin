import React from 'react';
import Header from '@/components/Header';

interface PageInnerWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  padding?: boolean;
}

const PageInnerWrapper: React.FC<PageInnerWrapperProps> = ({
  children,
  headerLabel,
  headerDescription,
  padding,
}) => {
  return (
    <div className="w-full h-full">
      <Header label={headerLabel} description={headerDescription} />
      <div
        className={`w-full h-full bg-neutral-100 md:px-4 md:pb-6  ${
          padding ? 'md:pt-32 pt-[66px]' : ''
        } p-3`}
      >
        <div className="bg-white h-full border-2 border-neutral-300">
          <div className="w-full h-full flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageInnerWrapper;
