'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { When } from 'react-if';

import Button from './Button';
import IconButton from './IconButton';
import PollContainer from './PollContainer';
import ToggleSwitch from './ToggleSwitch';

function RemoveIcon(): JSX.Element {
  return (
    <Image
      src="/icons/x.svg"
      alt="remove"
      width={18}
      height={18}
    />
  );
}

function AddIcon(): JSX.Element {
  return (
    <Image
      src="/icons/plus.svg"
      alt="add"
      width={16}
      height={20}
    />
  );
}

export default function CreatePollWidget(): JSX.Element {
  const [options, setOptions] = useState(['', '']);

  const handleAddOption = (): void => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (value: string, index: number): void => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleOptionRemove = (index: number): void => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    // todo: react-form-hook, and validation

    console.log('Submitted!');
  };

  return (
    <PollContainer>
      <form className="w-[100%] ">
        <div className="inputGroup flex flex-col">
          <label htmlFor="title" className="mb-[5px] font-medium text-white">Title</label>
          <input type="text" name="title" id="title" placeholder="Type your question here." className="mb-[10px] rounded-lg bg-tetraDark p-[10px] text-white outline-none focus:border-[1px] focus:border-primaryBlue" />
        </div>
        <div className="inputGroup flex flex-col">

          <fieldset className="flex flex-col">
            <legend className="mb-[5px] font-medium text-white">Answer Options</legend>
            {options.map((option, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="mb-[10px] flex h-[40px] items-center rounded-lg bg-tetraDark p-[10px]"
              >
                <input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(e.target.value, index)}
                  className=" grow bg-tetraDark text-white"
                />
                {/* Only show the remove button if there are more than 2 options */}
                <When condition={index > 1}>
                  <IconButton
                    theme="ghost"
                    type="button"
                    icon={<RemoveIcon />}
                    onClick={() => handleOptionRemove(index)}
                    className="transition-opacity hover:opacity-45"
                  />
                </When>
              </div>
            ))}
            <IconButton
              theme="secondary"
              type="button"
              icon={<AddIcon />}
              onClick={handleAddOption}
              className="max-w-[128px] justify-center px-[10px] py-[5px] text-[14px] text-grey"
            >
              Add Option
            </IconButton>
          </fieldset>
        </div>
        <div className="diver my-[15px] h-[2px] rounded-xl bg-primaryLight" />
        <div className="inputGroup flex flex-col">
          <label htmlFor="title" className="mb-[5px] font-medium text-white">Answer Type</label>
          <select className="mb-[10px] rounded-lg bg-tetraDark p-[10px] text-white outline-none focus:border-[1px] focus:border-primaryBlue">
            <option value="multiple">Multiple Choice</option>
          </select>
        </div>
        <div className="inputGroup my-[1vh] flex flex-row justify-between">
          <label htmlFor="multipleOptions" className="mb-[5px] text-primaryLight">Allow selection of multiple options</label>
          <ToggleSwitch name="multipleOptions" />
        </div>
        <div className="inputGroup flex flex-row justify-between">
          <label htmlFor="multipleVotes" className="mb-[5px] text-primaryLight">Allow multiple votes per IP address</label>
          <ToggleSwitch name="multipleVotes" />
        </div>
        <Button theme="primary" type="submit" onClick={handleSubmit} className="my-[1vh] w-[100%]">Create Poll</Button>
      </form>
    </PollContainer>
  );
}
