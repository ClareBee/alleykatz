import type { NextPage } from 'next';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex } from '@chakra-ui/react';
import { PostsProps } from '../ts/interfaces';

const POSTS_URL = 'https://api.thecatapi.com/v1/images'

const Home: NextPage<PostsProps> = ({ posts, favourites, votes }) => {
  return (
    <>
      <Posts posts={posts} favourites={favourites} votes={votes} />
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

  const res2 = await fetch('https://api.thecatapi.com/v1/favourites?sub_id=123', {
    headers: requestHeaders
  })

  const res3 = await fetch('https://api.thecatapi.com/v1/votes', {
    headers: requestHeaders
  })
  const favourites = await res2.json()

  const votes = await res3.json()
  return { props: { posts, favourites, votes } }
}

export default Home;
