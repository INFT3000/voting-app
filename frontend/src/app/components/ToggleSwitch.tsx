import React, { ChangeEvent, forwardRef, useState } from "react";

export type ToggleSwitchProps = React.ComponentProps<"input"> & {
  name: string;
};

const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  ({ name, ...props }, ref) => {
    const [enabled, setEnabled] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setEnabled(!enabled);
      props.onChange?.(e);
    };

    return (
      <label className="inline-flex cursor-pointer items-center">
        <input
          {...props}
          type="checkbox"
          className="hidden"
          name={name}
          checked={enabled}
          onChange={handleChange}
          ref={ref}
        />
        <div
          className={`flex w-[50px] items-center rounded-full p-1 ${enabled ? "bg-primaryBlue" : "bg-tetraDark"} transition-all duration-300`}
        >
          <div
            className={`size-[20px] rounded-full bg-white transition-all duration-300 ${enabled ? "translate-x-full bg-primaryBlue" : ""}`}
          />
        </div>
      </label>
    );
  },
);

export default ToggleSwitch;
