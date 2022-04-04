import type { NextPage } from 'next';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex } from '@chakra-ui/react';

const POSTS_URL = 'https://api.thecatapi.com/v1/images'
interface Props {
  posts: any
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Posts posts={posts} />
      <Flex width="100%" alignItems="center" justifyContent="flex-end" marginBottom="100px" marginTop="50px">
      <ImageUploaderModal />

      </Flex>
    </>
  );
};

// Called on every request
export async function getServerSideProps() {
  // TODO: refactor into service
  const requestHeaders: HeadersInit = new Headers();
  const query = `limit=100&include_vote=1&include_favourite=1`;
  const key = process.env.NEXT_PUBLIC_API_KEY;

  if (!key) {
    throw new Error('Missing credentials');
  }
  requestHeaders.set('x-api-key', key);

  const res = await fetch(`${POSTS_URL}?${query}`, {
    headers: requestHeaders
  })

  const posts = await res.json()

  return { props: { posts } }
}

export default Home;
