import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { PostsProps } from '../../ts/interfaces';
import { Favourite, Post, Vote } from '../../ts/types/types';
import LoadingSkeleton from '../Loading';
import CatPost from '../Post';

const Posts: React.FC<PostsProps> = ({
  posts,
  favourites,
  votes,
  mutateFavourites,
  mutatePosts,
  mutateVotes
}) => {
  const getPostVotes = (votes: Vote[], postId: string) => {
    if(!votes) { return [] };
    return votes.filter(vote => vote.image_id === postId)
  }

  const formatPosts = (posts: Post[]) => {
    if (!Array.isArray(posts)) {
      return;
    }
    return posts.map((post) => {
      let favourite;
      if (Array.isArray(favourites)) {
        favourite = favourites.find((fav: Favourite) =>
          fav.image_id === post.id ? fav : null
        );
      }
      const postVotes = getPostVotes(votes, post.id);
      
      return (
        <Flex key={post.id} alignItems="center" justifyContent="center">
          <CatPost
            post={post}
            key={post.id}
            favourite={favourite}
            postVotes={postVotes}
            mutateFavourites={mutateFavourites}
            mutatePosts={mutatePosts}
            mutateVotes={mutateVotes}
          />
        </Flex>
      );
    });
  };
  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacingX="40px" spacingY="20px">
      {posts ? formatPosts(posts) : <LoadingSkeleton />}
    </SimpleGrid>
  );
};

export default Posts;
