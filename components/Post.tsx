import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { CatPostProps } from '../ts/interfaces';


const CatPost: React.FC<CatPostProps> = ({ post: { url: imageUrl, id } }) => {
  return (
    <Box key={id} width="200px" height="200px" position="relative">
      <Image layout="fill" src={imageUrl} alt="cat" />
      Hello world
    </Box>
  );
};

export default CatPost;
