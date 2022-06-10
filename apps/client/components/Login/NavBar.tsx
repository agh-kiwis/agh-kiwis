import React from 'react';
import { Box, Flex, Button, Stack } from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@agh-kiwis/data-access';
import NextLink from 'next/link';

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
        <Stack justify={'flex-end'} direction={'row'} spacing={4}>
          <NextLink href="/login" passHref>
            <Button as={'a'} fontSize={'sm'} href={'/login'} color={'white'}>
              Sign In
            </Button>
          </NextLink>
          <NextLink href="/register" passHref>
            <Button fontSize={'sm'} variant={'outline'}>
              Sign Up
            </Button>
          </NextLink>
        </Stack>
      </>
    );
  } else {
    body = (
      <Flex>
        <Button
          onClick={() => {
            logoutMutation();
          }}
          isLoading={logoutLoading}
          variant="outline"
        >
          Sign out
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position="sticky" zIndex="sticky" top={0} p={4} shadow="md">
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
