import React from 'react';

interface iSkeleton {
  style?: string;
}
const Skeleton: React.FC<iSkeleton> = ({ style }) => {
  return (
    <div className={style?`bg-gray-400 animate-pulse rounded ${style}`:"bg-gray-400 animate-pulse h-4 w-full mt-1 rounded"}></div>
  );
};
export default Skeleton;
