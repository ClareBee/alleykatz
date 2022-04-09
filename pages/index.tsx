import type { NextPage } from 'next';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { PostsProps } from '../ts/interfaces';
import { getFavourites, FAVOURITE_URL } from '../services/favourite';
import { getVotes, VOTES_URL } from '../services/vote';
import { fetcher } from '../services/fetcher';
import useSWR, { SWRConfig } from 'swr';
import ImageUploader from '../components/ImageUploader';
import { useSession } from 'next-auth/react';

const Home: NextPage<PostsProps> = ({
  posts: postsProps,
  favourites: favouritesProps,
  votes: votesProps,
  postsError,
  votesError,
  favouritesError,
}) => {
  const { data: session } = useSession();
  const {
    data: posts,
    mutate: mutatePosts,
    error: postsSWRError,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/images`,
    fetcher,
    { fallbackData: postsProps, refreshInterval: 30000 }
  );
  const {
    data: favourites,
    mutate: mutateFavourites,
    error: favouritesSWRError,
  } = useSWR(FAVOURITE_URL, fetcher, { fallbackData: favouritesProps });
  const {
    data: votes,
    mutate: mutateVotes,
    error: votesSWRError,
  } = useSWR(VOTES_URL, fetcher, {
    fallbackData: votesProps,
    refreshInterval: 30000,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <Text>
        {postsError} {votesError} {favouritesError}
      </Text>
      <Text>
        {postsSWRError} {votesSWRError} {favouritesSWRError}
      </Text>

      <Posts
        posts={posts}
        favourites={favourites}
        votes={votes}
        mutateFavourites={mutateFavourites}
        mutatePosts={mutatePosts}
        mutateVotes={mutateVotes}
      />
      {session && (
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="flex-end"
          marginBottom="100px"
          marginTop="50px"
        >
          <ImageUploaderModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <ImageUploader
              isModal
              onClose={onClose}
              mutatePosts={mutatePosts}
            />
          </ImageUploaderModal>
        </Flex>
      )}
    </SWRConfig>
  );
};

// data for initial load
export async function getStaticProps() {
  const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images`);
  const posts = await postsRes.json()
  const { response: favourites, favouritesError } = await getFavourites('123');
  const { response: votes, votesError } = await getVotes();

  return {
    props: {
      posts,
      favourites,
      votes,
      // postsError,
      votesError,
      favouritesError,
      // res: resJson
    },
    revalidate: 1,
  };
}

export default Home;
