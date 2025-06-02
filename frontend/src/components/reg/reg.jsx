import Logo from "../logo/logo.jsx"
import BlueButton from "../blue-button/blue-button.jsx"
import './reg.css'
import InputField from "../input-field/input.jsx"
import CheckBox from "../checkbox/checkbox.jsx"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

// Главный компонент ==============================================
export default function Registration (){
    const [is_privacy,set_privacy] = useState(false)
    const navigate = useNavigate()

    // Данные ==============================================
    const [userData, setUserData] = useState({
        "mail": "",
        "phone": "",
        "password": "",
        "repeat_password": "",
    })

    // Ручка на изменение данных ==============================================
    const handleInput = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    // Проверка отправляеммых данных ==============================================
    const validate = () => {
        // Проверка email
        if (!userData.mail.includes("@") || !userData.mail.includes(".")) {
        alert("Неверный email");
        return false;
        }

        // Простая проверка телефона
        if (!/^\+?\d{10,15}$/.test(userData.phone)) {
        alert("Неверный номер телефона");
        return false;
        }

        return true
  };

    // Отправка данных ==============================================
    const submit = () => {
        try {
            Object.entries(userData).forEach(([key, value]) => {
                if (!value) {
                    alert("Не все данные введены")
                    throw new Error("Прерванно");
                }
        });
        } catch (error) {
            return
        }

        if (userData['password'] !== userData["repeat_password"]) {
            alert("Пароли не совпадают")
            return;
        }
        if (!is_privacy) {
            alert("Требуется принять политику конфиденциальности")
            return;
        }

        if (!validate()) {
            return;
        }

        try {
        axios.post(`${api_url}:${api_port}/api/accounts/create/`, userData, {withCredentials: true})
        .then( response => {
                console.log('Аккаунт создан');

                // Получение и установка токенов  =============================================
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('refresh_token', response.data.refresh_token)

                navigate("/account")
            }
        )
        .catch(error => {
            console.error('Ошибка Отправки', error.response?.data || error.message);
            alert('Ошибка отправки')})

        } catch (error) {
            throw error.response.data;
        }
    }

    // Форма ==============================================
    return(
        <div className="reg-body">
            <div className="reg-title" style={{backgroundImage: "url(/images/auth-background.png)"}}>
                <div className="reg-logo">
                    <Logo className="logo-biggest logo-white"/>
                </div>
                <div className="reg-info">
                    <h1>Создадим для вас<br/>лучшее предложение<br/>на рынке</h1>
                    <h2>Наш индивидуальный подход<br/>позволяет нам создавать<br/>решения, идеально<br/>соответствующие вашим<br/>целям и ожиданиям на рынке</h2>
                </div>
            </div>
            <form className="reg-form">
                <div className="reg-back">
                    <a href="#" onClick={()=>navigate(-1)}>{"<"} Вернуться</a>
                </div>
                <section className="reg-input-title">
                    <p>Давайте начнем.</p>
                    <h1>Регистрация Аккаунта</h1>
                </section>
                <div className="reg-input">
                    <InputField text="Ваша почта" placeholder="Например example@mail.ru" name="mail" type="mail" onChange={handleInput}/>
                    <InputField text="Телефон" placeholder="Ваш мобильный номер телефона" name="phone" onChange={handleInput}/>
                    <InputField text="Пароль" placeholder="Введите ваш пароль" type="password" name="password" onChange={handleInput} autocomplete="current-password"/>
                    <InputField text="Подтверждение пароля" placeholder="Введите повторно ваш пароль" type="password" name="repeat_password" onChange={handleInput} autocomplete="current-password"/>
                </div>
                <div className="reg-boxes">
                    {/* <CheckBox text="Запомнить меня" name="remember"/> */}
                    <CheckBox confid={true} name="privacy" onChange={set_privacy}/>
                </div>
                <div className="reg-submit">
                    <BlueButton text="Зарегистрироваться" className="blue-button-submit" onClick={submit}></BlueButton>
                    <a href="/login">Уже есть аккаунт?</a>
                </div>
                {/* <div className="reg-alt">
                    <p>Регистрация с помощью</p>
                    <div className="reg-alt-enter">

                    </div>
                </div> */}
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 473 900 128" className="reg-bottom">   
            <path d="m0 501 21.5 6.7c21.5 6.6 64.5 20 107.3 27.3 42.9 7.3 85.5 8.7 128.4-.7C300 525 343 505 385.8 501.5c42.9-3.5 85.5 9.5 128.4 17 42.8 7.5 85.8 9.5 128.6 2.3 42.9-7.1 85.5-23.5 128.4-33 42.8-9.5 85.8-12.1 107.3-13.5L900 473v128H0Z" fill="#475264"></path> 
            </svg>
        </div>
    )
}