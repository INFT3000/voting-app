'use client';
import React from "react"
import PollContainer from "./PollContainer"
import Button from "./Button"
import { useState } from "react";
import { When } from "react-if";
import ToggleSwitch from "./ToggleSwitch";
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
                                    className=" bg-tetraDark outline-none text-white grow"
                                />
                                {/*Only show the remove button if there are more than 2 options*/}
                                <When condition={index > 1}>
                                    <Button
                                        text="x"
                                        buttonType="button"
                                        theme="ghost"
                                        onClick={() => handleOptionRemove(index)}
                                        className="w-[40px] h-[40px] text-[14px] px-[0]"
                                    />
                                </When>
                                </div>
                            ))}
                            <Button
                                text="Add Option"
                                buttonType="button"
                                theme="secondary"
                                onClick={handleAddOption}
                                className="w-[25%] h-[40px] text-[14px] px-[5px] hover:bg-primaryBlue hover:text-primaryDark transition-all"
                            />
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
                <Button isSubmit={true} theme="primary" onClick={handleSubmit} buttonType="button" text="Create Poll" className="w-[100%] my-[1vh]"/>
            </form>
        </PollContainer>
    )
}

