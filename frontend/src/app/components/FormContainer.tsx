import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

function FormContainer({ children, className }: FormContainerProps): JSX.Element {
  return (
    <div
      className={`box-border flex w-[100%] items-center justify-center truncate rounded-lg border-[1px] border-primaryBlue bg-secondaryDark p-[25px] shadow-glow ${className || ""}`}
    >{children}
    </div>
  );
}

export default FormContainer;
