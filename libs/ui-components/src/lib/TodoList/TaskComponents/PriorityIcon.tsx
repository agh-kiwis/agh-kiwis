import { HiChevronDoubleUp, HiChevronDown, HiChevronUp } from 'react-icons/hi';

type PriorityProps = {
  priority: string;
};

export const PriorityIcon: React.FC<PriorityProps> = ({ priority }) => {
  const PriorityVariants: { [priority: string]: JSX.Element } = {
    low: <HiChevronDown size="24" />,
    medium: <HiChevronUp size="24" />,
    high: <HiChevronDoubleUp size="24" />,
  };

  return PriorityVariants[priority];
};

export default PriorityIcon;
