import { Box, SimpleGrid } from '@chakra-ui/react';

const FeedContainer = () => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 3 }} spacing="40px">
      <Box bg="brand.700" height="200px"></Box>
      <Box bg="brand.700" height="200px"></Box>
      <Box bg="brand.700" height="200px"></Box>
      <Box bg="brand.700" height="200px"></Box>
      <Box bg="brand.700" height="200px"></Box>
    </SimpleGrid>
  );
};

export default FeedContainer;
