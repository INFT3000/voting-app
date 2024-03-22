import { Tooltip } from "@mui/material";
import { Else, If, Then } from "react-if";

import Button, { ButtonProps } from "./Button";

type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
};

function IconButton({
  children, icon, iconPosition = "left", className, ...props
}: IconButtonProps): JSX.Element {
  return (
    <Button {...props} className={`flex items-center gap-[6px] ${iconPosition === "left" ? "flex-row" : "flex-row-reverse"} ${className}`}>
      {icon}
      {children}
    </Button>
  );
}

export default IconButton;
