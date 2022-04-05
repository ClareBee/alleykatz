import type { NextPage } from 'next';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex, Text } from '@chakra-ui/react';
import { PostsProps } from '../ts/interfaces';
import { getPosts } from '../services/posts';
import { getFavourites } from '../services/favourite';
import { getVotes } from '../services/vote';

const Home: NextPage<PostsProps> = ({
  posts,
  favourites,
  votes,
  postsError,
  votesError,
  favouritesError
}) => {
  return (
    <>
      <Text>
        {postsError} {votesError} { favouritesError}
      </Text>

      <Posts posts={posts} favourites={favourites} votes={votes} />
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="flex-end"
        marginBottom="100px"
        marginTop="50px"
      >
        <ImageUploaderModal />
      </Flex>
    </>
  );
};

// data for initial load
export async function getStaticProps() {
  const { response: posts, postsError } = await getPosts();
  const { response: favourites, favouritesError } = await getFavourites('123');
  const { response: votes, votesError } = await getVotes();

  return { props: { posts, favourites, votes, postsError, votesError, favouritesError } };
}

export default Home;
