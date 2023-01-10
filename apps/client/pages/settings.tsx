import React from 'react';
import { useRouter } from 'next/router';
import {
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@agh-kiwis/data-access';
import { momentToDate } from '@agh-kiwis/moment-service';
import {
  CommonButton,
  CustomSpinner,
  Logo,
  Wrapper,
} from '@agh-kiwis/ui-components';
import {
  DESCRIPTIVE_DATE_FORMAT,
  LOGIN_URL,
  TODO_LIST_URL,
} from '@agh-kiwis/workspace-constants';

const Settings: React.FC = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [logoutMutation] = useLogoutMutation({
    update(cache) {
      cache.evict({ fieldName: 'me' });
      cache.gc();
    },
  });

  const handleLogout = async () => {
    await logoutMutation();
    // TODO Clear Authorization cookie from document.cookie
    // document.cookie.split(';').forEach(function (c) {
    //   document.cookie = c
    //     .replace(/^ +/, '')
    //     .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    // });
  };

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <Wrapper>
      <Logo textVisible={false} />
      <VStack w="100%" justifyContent="center">
        <Text fontSize="3xl">{`Hello, ${data.me.name}!`}</Text>
        <TableContainer fontSize="md">
          <Table variant="simple" my="8">
            <Tbody>
              <Tr>
                <Td>Birthdate:</Td>
                <Td>
                  {momentToDate(data?.me?.birthDate, DESCRIPTIVE_DATE_FORMAT)}
                </Td>
              </Tr>
              <Tr>
                <Td>Email:</Td>
                <Td>{data?.me?.email}</Td>
              </Tr>
              <Tr>
                <Td>Gender:</Td>
                <Td>{data?.me?.gender}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <VStack align="stretch" w="100%">
        <HStack>
          <CommonButton
            buttonText="Edit details"
            onClick={() => router.push(`/edit/user`)}
          />
        </HStack>
        <HStack>
          <CommonButton
            variant="outline"
            colorScheme="red"
            buttonText="Sign out"
            onClick={() => {
              handleLogout();
              router.push(LOGIN_URL);
            }}
          />
          <CommonButton
            variant="outline"
            type="submit"
            buttonText="Cancel"
            onClick={() => {
              router.push(TODO_LIST_URL);
            }}
          />
        </HStack>
      </VStack>
    </Wrapper>
  );
};

export default Settings;
