import React from 'react';

export type ButtonTheme = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    theme?: ButtonTheme;
}

const themes = {
    primary: 'bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]',
    secondary: 'bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]',
    ghost: 'bg-transparent text-primaryBlue font-medium px-[50px] py-[7px]'
}

const getButtonStyle = (theme?: ButtonTheme) => {
    if (theme) {
        return themes[theme];
    }
    return ''
};

const Button: React.FC<ButtonProps> = ({theme, className, children, type, ...props}) => {

    const style = getButtonStyle(theme)
    return (
        <button {...props} className={`${style} ${className}`} type={type || 'button'}>
            {children}
        </button>
    )
}

export default Button;