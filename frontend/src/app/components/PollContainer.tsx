
import React, { ReactNode } from 'react';

interface PollContainerProps {
  children: ReactNode;
}

const PollContainer: React.FC<PollContainerProps> = ({ children }) => {
  return <div className="p-[25px] bg-secondaryDark border-2 border-secondaryLight shadow-blueTop border-lg w-[30vw] rounded-lg flex justify-center items-center box-border">{children}</div>;
};

export default PollContainer;