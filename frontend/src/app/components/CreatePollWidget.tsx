'use client';
import React from "react"
import PollContainer from "./PollContainer"
import Button from "./Button"
import { useState } from "react";
import { When } from "react-if";
import ToggleSwitch from "./ToggleSwitch";
import Image from "next/image";
import IconButton from "./IconButton";

const RemoveIcon = () => (
    <Image
        src="/icons/x.svg"
        alt="remove"
        width={18}
        height={18}
    />
);

const AddIcon = () => (
    <Image
        src="/icons/plus.svg"
        alt="add"
        width={16}
        height={20}
    />
);

export default function CreatePollWidget() {
    const [options, setOptions] = useState(["", ""]);

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };
    
    const handleOptionChange = (value, index) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleOptionRemove = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitted!");
    }
    

    return (
        <PollContainer> 
            <form className="w-[100%] ">
                <div className="inputGroup flex flex-col">
                    <label htmlFor="title" className="font-medium text-white mb-[5px]">Title</label>
                    <input type="text" name="title" id="title" placeholder="Type your question here." className="bg-tetraDark rounded-lg p-[10px] mb-[10px] outline-none focus:border-primaryBlue focus:border-[1px] text-white"/>
                </div>
                <div className="inputGroup flex flex-col">
                    
                        <fieldset className="flex flex-col">
                            <legend className="font-medium text-white mb-[5px]">Answer Options</legend>
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-tetraDark rounded-lg p-[10px] mb-[10px] h-[40px]"
                                >
                                <input
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(e.target.value, index)}
                                    className=" bg-tetraDark text-white grow"
                                />
                                {/*Only show the remove button if there are more than 2 options*/}
                                <When condition={index > 1}>
                                    <IconButton
                                        theme="ghost"
                                        type='button'
                                        icon={<RemoveIcon />}
                                        onClick={() => handleOptionRemove(index)}
                                        className="hover:opacity-45 transition-opacity"
                                    />
                                </When>
                                </div>
                            ))}
                            <IconButton
                                theme="secondary"
                                type='button'
                                icon={<AddIcon />}
                                onClick={handleAddOption}
                                className="text-[14px] justify-center text-grey px-[10px] py-[5px] max-w-[128px]"
                            >
                                Add Option
                            </IconButton>
                        </fieldset>
                </div>
                <div className="diver bg-primaryLight rounded-xl h-[2px] my-[15px]"></div>
                <div className="inputGroup flex flex-col">
                    <label htmlFor="title" className="font-medium text-white mb-[5px]">Answer Type</label>
                    <select className="bg-tetraDark rounded-lg p-[10px] mb-[10px] outline-none focus:border-primaryBlue focus:border-[1px] text-white" >
                        <option value="multiple">Multiple Choice</option>
                    </select>
                </div>
                <div className="inputGroup flex flex-row justify-between my-[1vh]">
                    <label htmlFor="multipleOptions" className="text-primaryLight mb-[5px]">Allow selection of multiple options</label>
                    <ToggleSwitch name="multipleOptions"/>
                </div>
                <div className="inputGroup flex flex-row justify-between">
                    <label htmlFor="multipleVotes" className="text-primaryLight mb-[5px]">Allow multiple votes per IP address</label>
                    <ToggleSwitch name="multipleVotes"/>
                </div>
                <Button theme="primary" type='submit' onClick={handleSubmit} className="w-[100%] my-[1vh]">Create Poll</Button>
            </form>
        </PollContainer>
    )
}

