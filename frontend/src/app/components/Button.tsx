import React from "react";

export type ButtonTheme = "primary" | "secondary" | "ghost";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  theme?: ButtonTheme;
};

const themes = {
  primary: "bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px] m-2",
  secondary: "bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px] m-2",
  ghost: "bg-transparent text-primaryBlue font-medium",
};

const getButtonStyle = (theme?: ButtonTheme): string => {
  if (theme) {
    return themes[theme];
  }
  return "";
};
// MouseEventHandler<HTMLButtonElement>
function Button({
  theme, className, children, type, ...props
}: ButtonProps): JSX.Element {
  const style = getButtonStyle(theme);
  return (
    <button {...props} className={`${style} ${className}`} type={type || "button"}>
      {children}
    </button>
  );
}

export default Button;
