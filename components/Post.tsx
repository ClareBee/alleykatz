import { Box } from '@chakra-ui/react';
import Image from 'next/image';

type Post = {
  height: Number;
  id: string;
  url: string;
  width: Number;
};

interface Props {
  post: Post,
  key: string
}
const CatPost: React.FC<Props> = ({ post: { url: imageUrl, id } }) => {
  return (
    <Box key={id} width="200px" height="200px" position="relative">
      <Image layout="fill" src={imageUrl} alt="cat" />
      Hello world
    </Box>
  );
};

export default CatPost;
