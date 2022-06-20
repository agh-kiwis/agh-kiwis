import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import { HiChevronDoubleUp } from "react-icons/hi";

// TODO Change priority hardcoded to enum(?)
export const PriorityIcon = (props) => {
  return (
    <>
      {(() => {
        switch (props.priority) {
          case 'Low':
            return <HiChevronDown />
          case 'Medium':
            return <HiChevronUp />
          case 'High':
            return <HiChevronDoubleUp />
          default:
            return null
        }
      })()}
    </>
  );
}

export default PriorityIcon;
