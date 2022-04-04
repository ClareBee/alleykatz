import { MouseEvent, useState } from 'react';
import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CatPostProps } from '../../ts/interfaces';
import VoteButtons from './VoteButtons';

const FAVOURITE_URL = 'https://api.thecatapi.com/v1/favourites';

const CatPost: React.FC<CatPostProps> = ({
  post: { url: imageUrl, id },
  favourite,
}) => {
  console.log('favourite_id', favourite);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUnfavourite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!favourite?.id) {
      return;
    }

    try {
      const requestHeaders: HeadersInit = new Headers();
      const key = process.env.NEXT_PUBLIC_API_KEY;

      if (!key) {
        throw new Error('Missing credentials');
      }
      requestHeaders.set('Content-Type', 'application/json');
      requestHeaders.set('x-api-key', key);

      const res = await fetch(`${FAVOURITE_URL}/${favourite.id}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers: requestHeaders,
      });
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };
  const handleFavourite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLiked(true);
    try {
      const requestHeaders: HeadersInit = new Headers();
      const key = process.env.NEXT_PUBLIC_API_KEY;

      if (!key) {
        throw new Error('Missing credentials');
      }
      requestHeaders.set('Content-Type', 'application/json');
      requestHeaders.set('x-api-key', key);
      const data = {
        image_id: id,
        sub_id: '123',
      };

      const res = await fetch(FAVOURITE_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
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
          Score {error ? 'error' : 'success'}
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
          <VoteButtons />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CatPost;
