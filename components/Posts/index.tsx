import { Box, SimpleGrid } from '@chakra-ui/react';
import CatPost from '../Post';

type Post = {
  height: Number;
  id: string;
  url: string;
  width: Number;
};

interface Props {
  posts: [Post]
}

// x

const Posts: React.FC<Props> = ({posts }) => {
  console.log('posts', posts)
  return (
    <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="40px">
      {posts && posts.map((post: Post) => <CatPost post={post} key={post.id} />)}
    </SimpleGrid>
  );
};

export default Posts;
