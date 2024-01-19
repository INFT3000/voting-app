import React, { ReactNode } from 'react';

interface PollContainerProps {
  children: ReactNode;
}

function PollContainer({ children }: PollContainerProps): JSX.Element {
  return (
    <div className="border-lg box-border flex w-[30vw] items-center justify-center rounded-lg border-2 border-secondaryLight bg-secondaryDark p-[25px] shadow-blueTop">{children}</div>
  );
}

export default PollContainer;
