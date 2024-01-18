'use client';
import React from "react"
import PollContainer from "./PollContainer"
import Button from "./Button"
import { useState } from "react";
import { When } from "react-if";
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
    
    return (
        <PollContainer> 
            <form className="w-[100%] ">
                <div className="inputGroup flex flex-col">
                    <label htmlFor="title" className="font-medium text-white mb-[5px]">Title</label>
                    <input type="text" name="title" id="title" placeholder="Type your question here." className="bg-tetraDark rounded-lg p-[10px] mb-[10px] outline-none focus:border-primaryBlue focus:border-[1px] text-white"/>
                </div>
                <div className="inputGroup flex flex-col">
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
                                    className=" bg-tetraDark outline-none text-white grow"
                                />
                                {/*Only show the remove button if there are more than 2 options*/}
                                <When condition={index > 1}>
                                    <Button
                                        theme="secondary"
                                        onClick={() => handleOptionRemove(index)}
                                        className="w-[40px] h-[40px] text-[14px] px-[0] hover:bg-primaryBlue hover:text-primaryDark transition-all ms-2"
                                    >x</Button>
                                </When>
                                </div>
                            ))}
                            <Button
                                theme="secondary"
                                onClick={handleAddOption}
                                className="w-[25%] h-[40px] text-[14px] px-[5px] hover:bg-primaryBlue hover:text-primaryDark transition-all"
                            >Add Option</Button>
                        </fieldset>
                    </div>

                </div>
            </form>
        </PollContainer>
    )
}

