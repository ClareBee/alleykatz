import { MouseEvent, useState } from 'react';
import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CatPostProps } from '../../ts/interfaces';
import VoteButtons from './VoteButtons';
import { Vote } from '../../ts/types/types';
import {
  favourite as favouriteFn,
  unfavourite,
} from '../../services/favourite';

const CatPost: React.FC<CatPostProps> = ({
  post: { url: imageUrl, id },
  favourite,
  votes,
  mutateFavourites,
}) => {
  const [error, setError] = useState(false)
  // TODO: refactor
  const calculateVote = (votes: Vote[]) => {
    console.log('id', id);
    let total = 0;
    votes?.map((vote) => {
      if (vote.image_id === id && vote.value === 1) {
        total += 1;
      }
      if (vote.image_id === id && vote.value === 0) {
        total -= 1;
      }
    });
    return total;
  };

  const handleUnfavourite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!favourite?.id) {
      return;
    }
    const { unfavouriteError } = await unfavourite(favourite.id);
    if (unfavouriteError) {
      console.log(unfavouriteError);
      setError(true)
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
      console.log(favouriteError);
    } else {
      mutateFavourites();
    }
  };
  return (
    <Box
      maxWidth="220px"
      padding="10px"
      shadow="md"
      margin={2}
      borderRadius="md"
    >
      <Stack>
        <Box
          position="relative"
          height="200px"
          width="200px"
          borderRadius="inherit"
        >
          <Image layout="fill" src={imageUrl} alt="cat" />
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
          {votes && calculateVote(votes)}
        </Text>
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
          <VoteButtons imageId={id} />
        </Stack>
        {error && 'Something went wrong'}
      </Stack>
    </Box>
  );
};

export default CatPost;
