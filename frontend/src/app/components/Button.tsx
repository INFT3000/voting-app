// import stuff from react-if
'use client';
import React from 'react'
import { If, Then, Else } from 'react-if';
type ButtonProps = {
    text: string
    onClick?: () => void
    buttonType: 'button' | 'anchor'
    theme?: 'primary' | 'secondary'
    href?: string
    className?: string
    isSubmit?: boolean
    }
    
export default function Button({ text, onClick, buttonType, theme = 'primary', href, className, isSubmit}: ButtonProps) {

    const style = theme === 'primary'
        ? 'bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]'
        : 'bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]'

    return (
        <If condition={buttonType === 'button'}>
            <Then>
                <button onClick={onClick} className={`${style} ${className}`} type={isSubmit ? "submit" : "button"}>
                    {text}
                </button>
            </Then>
            <Else>
                <a href={href} className={`${style} ${className}`}>{text}</a>
            </Else>
        </If>
    )
}