import "./blue-button.css"

export default function BlueButton({onClick, text, className=""}){
    return(
        <div className={`blue-button ${className}`} onClick={onClick}>{text}</div>
    )
}