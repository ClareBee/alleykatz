import type { NextPage } from 'next';
import Posts from '../components/Posts';
import ImageUploaderModal from '../components/ImageUploaderModal';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { PostsProps } from '../ts/interfaces';
import { FAVOURITE_URL } from '../services/favourite';
import { getVotes, VOTES_URL } from '../services/vote';
import { fetcher } from '../services/fetcher';
import useSWR, { SWRConfig } from 'swr';
import ImageUploader from '../components/ImageUploader';
import { useSession } from 'next-auth/react';
import ErrorMessage from '../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearError } from '../redux/errorSlice';

const Home: NextPage<PostsProps> = ({
  // posts: postsProps,
  votes: votesProps,
  // postsError,
  votesError,
}) => {
  const { data: session } = useSession();
  const user = session?.user?.name || '123';
  const {
    data: posts,
    mutate: mutatePosts,
    error: postsSWRError,
  } = useSWR(
    `api/images`,
    fetcher,
    { refreshInterval: 30000 }
  );
  const {
    data: favourites,
    mutate: mutateFavourites,
    error: favouritesSWRError,
  } = useSWR(`${FAVOURITE_URL}?sub_id=${user}`, fetcher);
  const {
    data: votes,
    mutate: mutateVotes,
    error: votesSWRError,
  } = useSWR(VOTES_URL, fetcher, {
    fallbackData: votesProps,
    refreshInterval: 30000,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error.error)

  const dismissError = () => dispatch(clearError())

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      {error && <ErrorMessage errorMessage={error} dismissError={dismissError}/>}
      {(postsSWRError) && <ErrorMessage errorMessage={postsSWRError} />}
      {(votesError || votesSWRError) && <ErrorMessage errorMessage={votesError} />}
      {(favouritesSWRError) && <ErrorMessage errorMessage={favouritesSWRError} />}

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
  // const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images`);
  // const posts = await postsRes.json()
  const { response: votes, votesError } = await getVotes();

  return {
    props: {
      // posts,
      votes,
      // postsError,
      votesError,
    },
    revalidate: 1,
  };
}

export default Home;
