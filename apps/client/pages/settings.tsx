import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@agh-kiwis/data-access';
import {
  CommonButton,
  CustomSpinner,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';
import { LOGIN_URL } from '@agh-kiwis/workspace-constants';

const Settings: React.FC = (props) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [logoutMutation] = useLogoutMutation({
    variables: {},
  });

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <Wrapper>
      <Logo textVisible={false} />
      <Flex w="100%" justifyContent="center">
        <Text fontSize="4xl">{`Hello, ${data.me.name}`}</Text>
      </Flex>
      <VStack mt="4" spacing="4">
        <CommonButton
          variant="solid"
          type="submit"
          buttonText="Sign out"
          onClick={() => {
            logoutMutation();
            router.push(LOGIN_URL);
          }}
        />
      </VStack>
    </Wrapper>
  );
};

export default Settings;
