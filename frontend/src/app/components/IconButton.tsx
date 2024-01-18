import Button, { ButtonProps } from "./Button";

type IconButtonProps = ButtonProps & {
    icon: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children?: React.ReactNode;
}


const IconButton: React.FC<IconButtonProps> = ({ children, icon, iconPosition = 'left', className, ...props }) => {
    return (
        <Button {...props} className={`flex items-center gap-[6px] ${iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'} ${className}`}>
            {icon}
            {children}
        </Button>
    )
};

export default IconButton;