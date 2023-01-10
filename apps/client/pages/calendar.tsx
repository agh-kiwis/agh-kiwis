import { getTaskColor } from 'libs/ui-components/src/lib/TodoList/TaskComponents/SingleTask';
import { TaskModal } from 'libs/ui-components/src/lib/TodoList/TaskComponents/TaskModal';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';
import { IoListOutline, IoSettingsOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  HStack,
  Icon,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useChunksQuery } from '@agh-kiwis/data-access';
import { AlertModal, CustomSpinner } from '@agh-kiwis/ui-components';
import { SETTINGS_URL, TODO_LIST_URL } from '@agh-kiwis/workspace-constants';
import { mapToCalendarTiles } from '../services/taskService';

const Calendar: React.FC = () => {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);
  const [clickedTask, setClickedTask] = useState(null);

  const { data, loading, error } = useChunksQuery({
    variables: {
      orderOptions: {
        desc: false,
        field: 'start',
      },
    },
  });

  if (loading) {
    return <CustomSpinner />;
  }
  if (error) {
    if (error.message.includes('Authentication failed')) {
      router.push('/login');
      return <></>;
    } else {
      return (
        <AlertModal status={'error'} title={'Error!'} message={error.message} />
      );
    }
  }

  return (
    <Container
      py="8"
      maxW={['350px', '400px', '500px', '600px']}
      height="100vh"
    >
      <VStack align="stretch" spacing="4">
        <FullCalendar
          initialView="timeGridDay"
          titleFormat={{ day: 'numeric', month: 'short' }}
          height="88vh"
          slotDuration="00:10:00"
          events={mapToCalendarTiles(data.chunks as any)}
          eventClick={(e) => {
            console.log(e.event);
            const chunk = data.chunks.find(
              (chunk) => chunk.id.toString() === e.event.id
            );
            setClickedTask(chunk.task);
            setModalOpened(true);
          }}
          plugins={[timeGridPlugin, interactionPlugin]}
          nowIndicator
          editable
          selectable
        />

        <HStack>
          <Button
            variant="outline"
            w="100%"
            onClick={() => router.push(TODO_LIST_URL)}
          >
            <Wrap spacing="8px">
              <Box>
                <WrapItem>
                  <Icon as={IoListOutline} />
                </WrapItem>
              </Box>
            </Wrap>
          </Button>
          <Button
            variant="outline"
            w="100%"
            onClick={() => router.push(SETTINGS_URL)}
          >
            <Wrap spacing="8px">
              <Box>
                <WrapItem>
                  <Icon as={IoSettingsOutline} />
                </WrapItem>
              </Box>
            </Wrap>
          </Button>
        </HStack>
      </VStack>
      {clickedTask && (
        <TaskModal
          color={getTaskColor(clickedTask)}
          isOpen={modalOpened}
          task={clickedTask}
          close={() => setModalOpened(false)}
        />
      )}
    </Container>
  );
};

export default Calendar;
