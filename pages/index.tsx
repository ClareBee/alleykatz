import type { NextPage } from 'next';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex, Text } from '@chakra-ui/react';
import { PostsProps } from '../ts/interfaces';
import { getPosts, POSTS_URL } from '../services/posts';
import { getFavourites, FAVOURITE_URL } from '../services/favourite';
import { getVotes, VOTES_URL } from '../services/vote';
import { fetcher } from '../services/fetcher';
import useSWR, { SWRConfig } from 'swr';

const Home: NextPage<PostsProps> = ({
  posts: postsProps,
  favourites: favouritesProps,
  votes: votesProps,
  postsError,
  votesError,
  favouritesError,
}) => {
  const { data: posts, mutate: mutatePosts, error: postsSWRError } = useSWR(
    `${POSTS_URL}?limit=100&include_vote=1&include_favourite=1`,
    fetcher,
    { fallbackData: postsProps, refreshInterval: 30000,
    }
  );
  const { data: favourites, mutate: mutateFavourites, error: favouritesSWRError } = useSWR(
    FAVOURITE_URL,
    fetcher,
    { fallbackData: favouritesProps }
  );
  const { data: votes, error: votesSWRError } = useSWR(VOTES_URL, fetcher, {
    fallbackData: votesProps,
    refreshInterval: 30000,
  });
  return (
    <SWRConfig value={{ provider: () => new Map()}}>
      <Text>
        {postsError} {votesError} {favouritesError}
      </Text>
      <Text>
        {postsSWRError} {votesSWRError} {favouritesSWRError}
      </Text>

      <Posts posts={posts} favourites={favourites} votes={votes} mutateFavourites={mutateFavourites} mutatePosts={mutatePosts} />
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="flex-end"
        marginBottom="100px"
        marginTop="50px"
      >
        <ImageUploaderModal />
      </Flex>
    </SWRConfig>
  );
};

// data for initial load
export async function getStaticProps() {
  const { response: posts, postsError } = await getPosts();
  const { response: favourites, favouritesError } = await getFavourites('123');
  const { response: votes, votesError } = await getVotes();

  return {
    props: {
      posts,
      favourites,
      votes,
      postsError,
      votesError,
      favouritesError,
    },
    revalidate: 1,
  };
}

export default Home;
