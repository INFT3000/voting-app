import { Tooltip } from "@mui/material";
import { Else, If, Then } from "react-if";

import Button, { ButtonProps } from "./Button";

type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  tooltip?: string;
  children?: React.ReactNode;
};

function IconButton({
  children, icon, iconPosition = "left", tooltip, className, ...props
}: IconButtonProps): JSX.Element {
  const button = (
    <Button {...props} className={`flex items-center gap-[6px] ${iconPosition === "left" ? "flex-row" : "flex-row-reverse"} ${className}`}>
      {icon}
      {children}
    </Button>
  );

  return (
    <If condition={!!tooltip}>
      <Then>
        <Tooltip title={tooltip}>
          <div>
            {button}
          </div>
        </Tooltip>
      </Then>
      <Else>
        {button}
      </Else>
    </If>
  );
}

export default IconButton;
