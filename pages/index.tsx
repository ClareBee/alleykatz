import type { NextPage } from 'next';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <>
      <Posts />
      <Flex width="100%" alignItems="center" justifyContent="flex-end" marginBottom="100px" marginTop="50px">
      <ImageUploaderModal />

      </Flex>
    </>
  );
};

export default Home;
