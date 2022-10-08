import { HiChevronDoubleUp, HiChevronDown, HiChevronUp } from 'react-icons/hi';

type PriorityProps = {
  priority: string;
};

export const PriorityIcon: React.FC<PriorityProps> = ({ priority }) => {
  const PriorityVariants: { [priority: string]: JSX.Element } = {
    Low: <HiChevronDown size="24" />,
    Medium: <HiChevronUp size="24" />,
    High: <HiChevronDoubleUp size="24" />,
  };

  return PriorityVariants[priority];
};

export default PriorityIcon;
