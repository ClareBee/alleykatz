import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/react';

const AppMenu = () => {
  const { data: session } = useSession();
  const sessionButton = () => {
    if(!session) {
    return <Button onClick={() => signIn()}>Sign in</Button>;
    }
    return (<Button onClick={() => signOut()} marginRight="10px" color="red.700">Sign out</Button>)
  };

  return (
    <Box>
      {sessionButton()}
      {session && session.user && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Account
          </MenuButton>
          <MenuList>
            <MenuItem minH="48px">
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={session?.user?.image || undefined}
                alt="Example account avatar"
                mr="12px"
              />
              <span>Signed in as {session?.user?.name}</span>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default AppMenu;
