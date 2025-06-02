import "./blue-button.css"

// Главный компонент ==============================================
export default function BlueButton({children, onClick, text, className="", type="button"}){
    return(
        <button className={`blue-button ${className}`} type={type} onClick={onClick}>{children}{text}</button>
    )
}