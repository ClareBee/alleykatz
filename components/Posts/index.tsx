import { Box, SimpleGrid } from '@chakra-ui/react';
import { PostsProps } from '../../ts/interfaces';
import { Post } from '../../ts/types/types';
import CatPost from '../Post';

const Posts: React.FC<PostsProps> = ({posts }) => {
  console.log('posts', posts)
  return (
    <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="40px">
      {posts && posts.map((post: Post) => <CatPost post={post} key={post.id} />)}
    </SimpleGrid>
  );
};

export default Posts;
