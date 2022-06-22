import { HiChevronDown } from 'react-icons/hi';
import { HiChevronUp } from 'react-icons/hi';
import { HiChevronDoubleUp } from 'react-icons/hi';

// TODO Change priority hardcoded to enum(?)
export const PriorityIcon = (props) => {
  return (
    <>
      {(() => {
        switch (props.priority) {
          case 1:
            return <HiChevronDown />;
          case 2:
            return <HiChevronUp />;
          case 3:
            return <HiChevronDoubleUp />;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default PriorityIcon;
