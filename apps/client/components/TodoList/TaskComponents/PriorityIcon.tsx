import { HiChevronDown, HiChevronUp, HiChevronDoubleUp } from 'react-icons/hi';

export const PriorityIcon = (props) => {
  const PriorityVariants = {
    Low: <HiChevronDown />,
    Medium: <HiChevronUp />,
    High: <HiChevronDoubleUp />,
  };

  return <>{PriorityVariants[props.priority]}</>;
};

export default PriorityIcon;
