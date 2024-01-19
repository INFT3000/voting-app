import React, { useState } from 'react';

const ToggleSwitch = ({ name }) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = () => {
    setEnabled(!enabled);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input 
        type="checkbox"
        className="hidden"
        name={name}
        checked={enabled}
        onChange={handleChange}
      />
      <div 
        className={`rounded-full w-[50px] flex items-center p-1 ${enabled ? 'bg-primaryBlue' : 'bg-tetraDark'} transition-all duration-300`}
      >
        <div 
          className={`rounded-full w-[20px] h-[20px] bg-white transition-all duration-300 ${enabled ? 'translate-x-full bg-primaryBlue' : ''}`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;

