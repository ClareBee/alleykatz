import { MouseEvent } from 'react';
import { Box, Button, IconButton, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CatPostProps } from '../../ts/interfaces';
import VoteButtons from './VoteButtons';

import { calculateVote, getUserVote } from '../../utils/helpers';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/errorSlice';

const CatPost: React.FC<CatPostProps> = ({
  post: { url: imageUrl, id, sub_id },
  favourite,
  postVotes,
  mutateFavourites,
  mutatePosts,
  mutateVotes,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const postIsUsers = () => sub_id === session?.user?.name || sub_id === null;

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    const response = await fetch(`/api/image/${id}`, { method: 'DELETE' });
    if (response.ok) {
      mutatePosts();
    } else {
      dispatch(setError('We ran into problems deleting the image. Try again!'));
    }
  };

  const handleUnfavourite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!favourite?.id) {
      return;
    }
    const response = await fetch(`/api/favourite/${favourite.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      dispatch(setError('We ran into problems unliking the image. Try again!'));
    } else {
      mutateFavourites();
    }
  };

  const handleFavourite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    let user;
    if (session?.user?.name) {
      user = session.user.name;
    }
    const response = await fetch(`/api/favourite/${id}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({ userId: user }),
    });
    if (!response.ok) {
      dispatch(setError('We ran into problems liking the image. Try again!'));
    } else {
      mutateFavourites();
    }
  };

  return (
    <Box
      tabIndex={0}
      maxWidth="220px"
      padding="10px"
      shadow="md"
      margin={2}
      borderRadius="md"
      transition="all 0.15s ease-in-out"
      backgroundColor="rgba(0, 0, 0, 0.02)"
      _hover={{
        backgroundColor: '#fff',
        shadow: 'lg',
        transform: 'scale3d(1.05, 1.05, 1)',
      }}
      _focus={{
        border: '1px solid black',
        backgroundColor: '#fff',
        shadow: 'lg',
        transform: 'scale3d(1.05, 1.05, 1)',
      }}
    >
      <Stack>
        <Box
          position="relative"
          height="200px"
          width="200px"
          borderRadius="inherit"
        >
          {session && postIsUsers() && (
            <Button
              position="absolute"
              right="2px"
              top="2px"
              zIndex={2}
              fontSize="3xl"
              lineHeight="0"
              color="red"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              borderRadius="full"
              padding="0px"
              onClick={(e) => handleDelete(e)}
            >
              &times;
            </Button>
          )}
          <Image
            layout="fill"
            src={imageUrl}
            objectFit="cover"
            alt="cat"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
        </Box>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          textAlign="right"
          letterSpacing="wide"
          color="brand.700"
        >
          Score:
          {postVotes && calculateVote(postVotes)}
        </Text>
        {session && (
        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          marginTop="10px"
        >
          {!favourite?.id ? (
            <IconButton
              aria-label="Like this cat"
              icon={<FaRegHeart />}
              onClick={(e) => handleFavourite(e)}
            />
          ) : (
            <IconButton
              aria-label="Unlike this cat"
              icon={<FaHeart fill="red" />}
              onClick={(e) => handleUnfavourite(e)}
            />
          )}
          <VoteButtons
            imageId={id}
            mutateVotes={mutateVotes}
            userVote={getUserVote(postVotes, session?.user?.name)}
          />
        </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default CatPost;
