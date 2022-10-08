import { HiChevronDoubleUp, HiChevronDown, HiChevronUp } from 'react-icons/hi';

type PriorityProps = {
  priority: string;
};

export const PriorityIcon: React.FC<PriorityProps> = ({ priority }) => {
  const PriorityVariants: { [priority: string]: JSX.Element } = {
    Low: <HiChevronDown />,
    Medium: <HiChevronUp />,
    High: <HiChevronDoubleUp />,
  };

  return PriorityVariants[priority];
};

export default PriorityIcon;
