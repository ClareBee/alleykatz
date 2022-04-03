import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const AppMenu = () => (
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
      Menu
    </MenuButton>
    <MenuList>
      <MenuItem minH="48px">
        <Image
          boxSize="2rem"
          borderRadius="full"
          src="https://placekitten.com/100/100"
          alt="Example account avatar"
          mr="12px"
        />
        <span>User Placeholder</span>
      </MenuItem>
    </MenuList>
  </Menu>
);

export default AppMenu;
