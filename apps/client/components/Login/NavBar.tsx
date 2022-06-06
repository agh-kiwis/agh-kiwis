import React from 'react';
import NextLink from 'next/link';
import { Flex, Box, Button, Link } from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@agh-kiwis/data-access';

export const NavBar = () => {
  const [logoutMutation, { data: loggedOut, loading: logoutLoading }] =
    useLogoutMutation();
  const { data: meData, loading: meLoading } = useMeQuery();
  let body = null;

  if (meLoading) {
    // Loading animation or something
    console.log('loading');
  } else if (!meData?.me || loggedOut) {
    body = (
      <>
        <NextLink href="/login" passHref>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{meData.me.id}</Box>
        <Button
          onClick={() => {
            logoutMutation();
          }}
          isLoading={logoutLoading}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position="sticky" top={0} zIndex="sticky" bg="tan" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
