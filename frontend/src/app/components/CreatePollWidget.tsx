'use client';
import React from "react"
import PollContainer from "./PollContainer"
import Button from "./Button"
import { useState } from "react";
export default function CreatePollWidget() {
    const [options, setOptions] = useState(["", ""]);

    const handleAddOption = () => {
        // Add a new option with an empty string to the options array
        setOptions([...options, ""]);
    };
    
    // Function to handle change in any option input
    const handleOptionChange = (value, index) => {
        // Update the specific option value in the options array
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };
    
    return (
        <PollContainer> 
            <form className="w-[100%] ">
                <div className="inputGroup flex flex-col">
                    <label htmlFor="title" className="font-medium text-white mb-[5px]">Title</label>
                    <input type="text" name="title" id="title" placeholder="Type your question here." className="bg-tetraDark rounded-lg p-[10px] mb-[10px] outline-none focus:border-primaryBlue focus:border-[1px] "/>
                </div>
                <div className="inputGroup flex flex-col">
                    <div className="inputGroup flex flex-col">
                        <fieldset className="flex flex-col">
                            <legend className="font-medium text-white mb-[5px]">Answer Options</legend>
                            {options.map((option, index) => (
                                <input
                                    key={index}
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(e.target.value, index)}
                                    className="bg-tetraDark rounded-lg p-[10px] mb-[10px] outline-none focus:border-primaryBlue focus:border-[1px]"
                                />
                            ))}
                            <Button
                                text="Add Option"
                                buttonType="button"
                                styleType="secondary"
                                onClick={handleAddOption}
                                className="w-[25%] h-[40px] text-[14px] px-[5px] hover:bg-primaryBlue hover:text-primaryDark transition-all"
                            />
                        </fieldset>
                    </div>

                </div>
            </form>
        </PollContainer>
    )
}

