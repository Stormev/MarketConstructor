import './logo.css'
import Logo from './logo.png'

export default function Current_logo(props)
{
    return (
        <div className={`logo-box ${props.className}`}>
        <img className='logo-img' src={Logo} alt="" />
        <h2>Ключевик</h2>
        </div>
    )
}