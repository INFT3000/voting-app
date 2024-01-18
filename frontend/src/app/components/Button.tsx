// import stuff from react-if
'use client';
import React from 'react'
import { If, Then, Else } from 'react-if';
type ButtonProps = {
    text: string
    onClick?: () => void
    buttonType: 'button' | 'anchor'
    styleType: 'primary' | 'secondary'
    href?: string
    className?: string
    isSubmit?: boolean
    }
    
export default function Button({ text, onClick, buttonType, styleType, href, className, isSubmit}: ButtonProps) {
    
    return (
        <If condition={buttonType === 'button'}>
            <Then>
                <If condition={styleType === 'primary'}>
                    <Then>
                        <button onClick={onClick} className={`bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px] ${className}`} type={isSubmit ? "submit" : "button"}>
                            {text}
                        </button>
                    </Then>
                    <Else>
                        <button onClick={onClick} className={`bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px] ${className}`} type={isSubmit ? "submit" : "button"}>
                            {text}
                        </button>
                    </Else>
                </If>
            </Then>
            <Else>
                <If condition={styleType === 'primary'}>
                    <Then>
                        <a href={href} className={`bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px] ${className}`}>{text}</a>
                    </Then>
                    <Else>
                        <a href={href} className={`bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px] ${className}`}>{text}</a>
                    </Else>
                </If>
            </Else>
        </If>
    )
}