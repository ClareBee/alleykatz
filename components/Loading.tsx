import { Skeleton } from '@chakra-ui/react';

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton height="200px" width="200px" />
      <Skeleton height="200px" width="200px" />
      <Skeleton height="200px" width="200px" />
      <Skeleton height="200px" width="200px" />
    </>
  );
};
export default LoadingSkeleton;
