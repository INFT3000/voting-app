import { Tooltip } from "@mui/material";
import React from "react";
import { Else, If, Then } from "react-if";

export type ButtonTheme = "primary" | "secondary" | "ghost";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  theme?: ButtonTheme;
  tooltip?: string;
};

const themes = {
  primary: "bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px] hover:bg-hoverBlue transition-colors duration-300",
  // eslint-disable-next-line max-len
  secondary: "bg-transparent border-primaryBlue border-[1px] rounded-lg text-white font-medium px-[50px] py-[7px] hover:bg-primaryBlue hover:text-primaryDark transition-colors duration-300",
  ghost: "bg-transparent text-primaryBlue font-medium",
};

const getButtonStyle = (theme?: ButtonTheme): string => {
  if (theme) {
    return themes[theme];
  }
  return "";
};
// MouseEventHandler<HTMLButtonElement>

function BaseButton({
  theme, className, children, tooltip, type, ...props
}: ButtonProps): React.ReactNode {
  const style = getButtonStyle(theme);
  return (
    <button {...props} className={`${style} ${className}`} type={type || "button"}>
      {children}
    </button>
  );
}

function Button({
  children, tooltip, ...props
}: ButtonProps): JSX.Element {
  return (
    <If condition={!!tooltip}>
      <Then>
        <Tooltip title={tooltip}>
          <div>
            <BaseButton {...props}>
              {children}
            </BaseButton>
          </div>
        </Tooltip>
      </Then>
      <Else>
        <BaseButton {...props}>
          {children}
        </BaseButton>
      </Else>
    </If>
  );
}

export default Button;
