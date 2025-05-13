import './button.css'
import { useNavigate } from 'react-router-dom';

export default function ButtonProfile(){
    const navigate = useNavigate()
    const Enter = () => {
        const access_token = localStorage.getItem('access_token')
        // const refresh_token = localStorage.getItem('refresh_token')
        if (access_token) {
            navigate('/account')
        } else {
            navigate('/login')
        }
    }
    return(
        <button className='button-profile' onClick={Enter}></button>
    )
}