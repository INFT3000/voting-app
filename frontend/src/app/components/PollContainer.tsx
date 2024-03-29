import React, { ReactNode } from "react";

interface PollContainerProps {
  children: ReactNode;
}

function PollContainer({ children }: PollContainerProps): JSX.Element {
  return (
    <div
      className="box-border flex w-[100%] items-center justify-center rounded-lg border-[1px] border-primaryBlue bg-secondaryDark p-[25px] shadow-glow"
    >{children}
    </div>
  );
}

export default PollContainer;
