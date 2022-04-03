import { Flex } from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';
import AppMenu from './Menu';

const Navbar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      w="100%"
      mb={8}
      p={8}
      bg={['primary.500']}
      color={['brand.700']}
    >
      <Logo />
      <AppMenu />
    </Flex>
  );
};

export default Navbar;
