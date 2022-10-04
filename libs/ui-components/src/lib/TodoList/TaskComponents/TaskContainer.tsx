import { Stack } from '@chakra-ui/layout';

interface TaskContainerProps {
  children: React.ReactNode;
  bgColor: string;
  onClick?: () => void;
}

export const TaskContainer: React.FC<TaskContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Stack borderRadius="0.7rem" p="2rem" color="white" {...props}>
      {children}
    </Stack>
  );
};
