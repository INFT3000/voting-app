import { ButtonProps } from "./Button";

type IconButtonProps = ButtonProps & {
    icon: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children?: React.ReactNode;
}


const IconButton: React.FC<IconButtonProps> = ({ children, icon, iconPosition = 'left', className, ...props }) => {
    return (
        <button {...props} className={`flex items-center ${iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'} ${className}`}>
            {icon}
            {children}
        </button>
    )
};

export default IconButton;