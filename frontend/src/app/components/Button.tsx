// import stuff from react-if
'use client';
import React from 'react'
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';
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


    // Old switch statement left here just in case
    // switch(buttonType) {
    //     case 'button':
    //         return styleType === 'primary' ? (
    //             <button onClick={onClick} className="bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]">
    //                 {text}
    //             </button>
    //           ) : (
    //             <button onClick={onClick} className="bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]">
    //                 {text}
    //             </button>
    //           )
    //     case 'anchor':
    //         return styleType === 'primary' ? (
    //             <a href={href} className="bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]">{text}</a>
    //           ) : (
    //             <a href={href} className="bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]">{text}</a>
    //           );
              
    //     default:
    //         return (
    //             <p className="text-white font-bold">Invalid button type property. Please use &quot;button&quot; or &quot;anchor&quot;</p>
    //         )
            
    // }
}