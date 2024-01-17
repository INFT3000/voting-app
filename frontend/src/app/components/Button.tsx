export default function Button({ text, onClick, buttonType, styleType, href}) {
    switch(buttonType) {
        case 'button':
            return styleType === 'primary' ? (
                <button onClick={onClick} className="bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]">
                    {text}
                </button>
              ) : (
                <button onClick={onClick} className="bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]">
                    {text}
                </button>
              )
        case 'anchor':
            return styleType === 'primary' ? (
                <a href={href} className="bg-primaryBlue rounded-lg text-primaryDark font-medium px-[50px] py-[7px]">{text}</a>
              ) : (
                <a href={href} className="bg-transparent border-primaryBlue border-2 rounded-lg text-white font-medium px-[50px] py-[7px]">{text}</a>
              );
              
        default:
            return (
                <p className="text-white font-bold">Invalid button type property. Please use &quot;button&quot; or &quot;anchor&quot;</p>
            )
            
    }
}