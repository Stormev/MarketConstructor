import Logo from "../logo/logo.jsx"
import BlueButton from "../blue-button/blue-button.jsx"
import './login.css'
import InputField from "../input-field/input.jsx"
import CheckBox from "../checkbox/checkbox.jsx"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

export default function Login (){
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        'mail': '',
        'password': '',
        'remember': false
    })

    const handleSetData = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleCheckboxChange = (e) => {
            setUserData({
            ...userData,
            [e.target.name]: e.target.checked
        })
    }

    const submit = () => {
        if (!userData.mail) {
            alert("Поле почта не заполнено")
            return;
        }
        if (!userData.mail.includes("@") || !userData.mail.includes(".")) {
            alert("Неправильный формат почты")
            return;
        }
        if (!userData.password) {
            alert("Поле пароля не заполнено")
            return;
        }
        axios.post(`${api_url}:${api_port}/api/accounts/token/`, userData, {withCredentials: true})
        .then(response => {
            console.log(response.data)
            if (response.data.message === "success") {
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('refresh_token', response.data.refresh_token)
                navigate("/account")
            } else alert("Неправильный логин или пароль");
        })
        .catch(error => {
            if (error.message) {
                console.error('Ошибка', error.response?.data || error.message);
                alert('Неправильный логин или пароль')}
            })
    }

    return(
        <div className="login-body">
            <div className="login-title" style={{backgroundImage: "url(/images/auth-background.png)"}}>
                <div className="login-logo">
                    <Logo className="logo-biggest logo-white"/>
                </div>
                <div className="login-info">
                    <h1>Создадим для вас<br/>лучшее предложение<br/>на рынке</h1>
                    <h2>Наш индивидуальный подход<br/>позволяет нам создавать<br/>решения, идеально<br/>соответствующие вашим<br/>целям и ожиданиям на рынке</h2>
                </div>
            </div>
            <form className="login-form">
                <div className="login-back">
                    <a href="/">{"<"} Вернуться</a>
                </div>
                <section className="login-input-title">
                    <p>Давайте начнем.</p>
                    <h1>Вход в личный кабинет</h1>
                </section>
                <div className="login-input">
                    <input type="text" name="username" id="username" style={{display: 'none'}} autoComplete="username"></input>
                    <InputField text="Почта" placeholder="Например example@mail.ru" onChange={handleSetData} name="mail" type="mail" autocomplete="mail"/>
                    <InputField text="Пароль" placeholder="Введите ваш пароль" onChange={handleSetData} type="password" name="password" autocomplete="current-password"/>
                </div>
                <div className="login-boxes">
                    <CheckBox text="Запомнить меня" name="remember" onChange={handleCheckboxChange}/>
                </div>
                <div className="login-submit">
                    <BlueButton text="Авторизоваться" className="blue-button-submit" onClick={submit}></BlueButton>
                    <a href="/reg">Нет акаунта? Зарегестрироваться!</a>
                </div>
                {/* <div className="login-alt">
                    <p>Регистрация с помощью</p>
                    <div className="login-alt-enter">

                    </div>
                </div> */}
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 473 900 128" className="login-bottom">   
            <path d="m0 501 21.5 6.7c21.5 6.6 64.5 20 107.3 27.3 42.9 7.3 85.5 8.7 128.4-.7C300 525 343 505 385.8 501.5c42.9-3.5 85.5 9.5 128.4 17 42.8 7.5 85.8 9.5 128.6 2.3 42.9-7.1 85.5-23.5 128.4-33 42.8-9.5 85.8-12.1 107.3-13.5L900 473v128H0Z" fill="#475264"></path> 
            </svg>
        </div>
    )
}