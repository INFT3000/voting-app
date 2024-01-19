import React, { useState } from 'react';

function ToggleSwitch({ name }: { name: string }): JSX.Element {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (): void => {
    setEnabled(!enabled);
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="hidden"
        name={name}
        checked={enabled}
        onChange={handleChange}
      />
      <div
        className={`flex w-[50px] items-center rounded-full p-1 ${enabled ? 'bg-primaryBlue' : 'bg-tetraDark'} transition-all duration-300`}
      >
        <div
          className={`size-[20px] rounded-full bg-white transition-all duration-300${enabled ? 'translate-x-full bg-primaryBlue' : ''}`}
        />
      </div>
    </label>
  );
}

export default ToggleSwitch;
