import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { PostsProps } from '../../ts/interfaces';
import { Favourite, Post } from '../../ts/types/types';
import CatPost from '../Post';

const Posts: React.FC<PostsProps> = ({ posts, favourites }) => {
  console.log('posts', posts);
  console.log('favourites', favourites);
  const formatPosts = (posts: Post[]) => {
    return posts.map((post) => {
      let favourite = favourites.find((fav: Favourite) =>
        fav.image_id === post.id ? fav : null
      );
      console.log('fav', favourite);
      return (
        <Flex key={post.id} alignItems="center" justifyContent="center">
          <CatPost post={post} key={post.id} favourite={favourite} />
        </Flex>
      );
    });
  };
  return (
    <SimpleGrid columns={{ sm: 2, md: 3 }} spacingX="40px" spacingY="20px">
      {posts ? formatPosts(posts) : 'No Posts available'}
    </SimpleGrid>
  );
};

export default Posts;
