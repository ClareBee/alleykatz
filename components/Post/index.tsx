import { MouseEvent, useState } from 'react';
import { Box, Button, IconButton, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CatPostProps } from '../../ts/interfaces';
import VoteButtons from './VoteButtons';
import {
  favourite as favouriteFn,
  unfavourite,
} from '../../services/favourite';
import { deletePost } from '../../services/posts';
import { calculateVote, getUserVote } from '../../utils/helpers';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/errorSlice';

const CatPost: React.FC<CatPostProps> = ({
  post: { url: imageUrl, id },
  favourite,
  postVotes,
  mutateFavourites,
  mutatePosts,
  mutateVotes,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    const { postDeleteError } = await deletePost(id);
    if (postDeleteError) {
      console.log(postDeleteError);
      dispatch(setError('We ran into problems deleting the image. Try again!'));
    } else {
      mutatePosts();
    }
  };

  const handleUnfavourite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!favourite?.id) {
      return;
    }
    const { unfavouriteError } = await unfavourite(favourite.id);
    if (unfavouriteError) {
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
    const { favouriteError } = await favouriteFn(id);
    if (favouriteError) {
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
         {session && <Button
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
}
          <Image
            layout="fill"
            src={imageUrl}
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
        {session && 
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
            userVote={getUserVote(postVotes)}
          />
        </Stack>
        }
      </Stack>
    </Box>
  );
};

export default CatPost;
