import React from 'react';

type ButtonTheme = 'primary' | 'secondary';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    theme?: ButtonTheme;
}

const themes = {
    primary: 'bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]',
    secondary: 'bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]',
}

const getButtonStyle = (theme?: ButtonTheme) => {
    if (theme) {
        return themes[theme];
    }
    return ''
};

export default function Button(props: ButtonProps) {

    const style = getButtonStyle(props.theme)
    return (
        <button {...props} className={`${style} ${props.className}`} type={props.type || 'button'}>
            {props.children}
        </button>
    )
}