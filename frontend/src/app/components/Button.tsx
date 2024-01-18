import React from 'react';
import { If, Then, Else } from 'react-if';

type ButtonProps = {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // Updated type
    buttonType: 'button' | 'anchor';
    theme?: 'primary' | 'secondary' | 'ghost';
    href?: string;
    className?: string;
    isSubmit?: boolean;
};

export default function Button({ text, onClick, buttonType, theme = 'primary', href, className, isSubmit }: ButtonProps) {
    const getStyle = (theme: 'primary' | 'secondary' | 'ghost') => {
        switch (theme) {
            case 'primary':
                return 'bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]';
            case 'secondary':
                return 'bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]';
            case 'ghost':
                return 'bg-transparent rounded-lg text-primaryLight font-medium border-none hover:bg-transparent hover:text-primaryBlue transition-all';
            default:
                return ''; 
        }
    };

    const style = getStyle(theme);


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
    );
}
