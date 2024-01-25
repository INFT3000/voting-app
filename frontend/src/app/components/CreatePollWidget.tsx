"use client";

import { ErrorMessage } from "@hookform/error-message";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { When } from "react-if";

import Button from "./Button";
import IconButton from "./IconButton";
import PollContainer from "./PollContainer";
import ToggleSwitch from "./ToggleSwitch";

interface ICreatePoll {
  title: string;
  options: string[];
  type: "multiple" | "single";
  settings: {
    disallowAnonymous: boolean;
    disallowSameIp: boolean;
  };
}

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

function ErrorText({ message }: { message: string }): JSX.Element {
  return (
    <p style={{ color: "red" }}>{message}</p>
  );
}

export default function CreatePollWidget(): JSX.Element {
  const formMethods = useForm<ICreatePoll>();
  const {
    register, setError, formState, handleSubmit,
  } = formMethods;

  const { errors } = formState;
  const [options, setOptions] = useState(["", ""]);

  const handleAddOption = (): void => {
    setOptions([...options, ""]);
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

  const onSubmit = (payload: ICreatePoll): void => {
    console.log(payload);
    console.log("Submitted!");
  };

  return (
    <PollContainer>
      <form className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup flex flex-col">
          <label htmlFor="title" className="mb-[5px] font-medium text-white">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required", minLength: 3, maxLength: 255 })}
            id="title"
            placeholder="Type your question here."
            className="mb-[10px] rounded-lg bg-tetraDark p-[10px] text-white outline-none focus:border-[1px] focus:border-primaryBlue"
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={ErrorText}
          />
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
                  className=" w-full grow bg-tetraDark text-white"
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
              className="max-w-[30vw] justify-center px-[3px] text-[14px] text-grey md:w-[15vw] md:text-[12px] lg:w-[10vw] lg:text-[13px]"
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
        <Button theme="primary" type="submit" className="my-[1vh] w-[100%]">Create Poll</Button>
      </form>
    </PollContainer>
  );
}
