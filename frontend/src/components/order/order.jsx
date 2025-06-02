import "./order.css"
import Logo from "../logo/logo.jsx"
import BlueButton from "../blue-button/blue-button.jsx"
import InputField from "../input-field/input.jsx"
import CheckBox from "../checkbox/checkbox.jsx"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const apiUrl = process.env.REACT_APP_API_URL;
const apiPort = process.env.REACT_APP_API_PORT;

export default function Order(){
    const navigate = useNavigate()
    // Данные ==============================================
    const [formData, setFormData] = useState({
        user_name: '',
        phone: '',
        buy: false,
        build: false,
        setup_devices: false,
        build_foundation: false,
        repair: false,
        create_project: false,
        terraforming: false,
        other: false,
    });

    const [userData, setUserData] = useState({})
    const [callToUser, setCallToUser] = useState(false)

    // Ручка на checkbox из услуг ==============================================

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
        });
    };

    // Ручка на checkbox позвонить на номер аккаунта ==============================================

    const handleCallToUser = () => {
        setCallToUser(!callToUser)
    }

    // Получение пользователя (если авторизован) ==============================================
    useEffect(()=> {
        axios.post(`${apiUrl}:${apiPort}/api/accounts/user/`, {
            access_token: localStorage.getItem("access_token"),
            refresh_token: localStorage.getItem("refresh_token"),
        }).then(response=>{
            if(!response.data || (userData && Object.keys(userData).length > 0)) return;
            setUserData(response.data)
        }).catch(err=>{
            console.error(err)
        });
    }, [])

    // Отправка данных ==============================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (callToUser) {
            setFormData(
                {
                    ...formData,
                    ['phone']: userData.phone
                }
            )
        }
        try {
        const response = await axios.post(`${apiUrl}:${apiPort}/api/orders/`, formData);
        console.log('Заказ создан:', response.data);
        alert('Успешно отправлено');
        } catch (error) {
        console.error('Ошибка при создании заказа:', error.response?.data || error.message);
        alert('Ошибка отправки');
    }
  };

    // Главная форма ==============================================
    return(
        <div className="order-body">
            <div className="order-title" style={{backgroundImage: "url(/images/backgroundOrder.png)"}}>
                <div className="order-logo">
                    <Logo className="logo-biggest logo-white"/>
                </div>
                <div className="order-info">
                    <h1>Подберем вам<br/>недвижимость</h1>
                    <h2>Мы выберим идеальные<br/>варианты для вас, построим<br/>дом мечты, сделаем ремонт</h2>
                </div>
            </div>
            <form className="order-form">
                <div className="order-back">
                    <a href="#" onClick={()=>navigate(-1)}>{"<"} Вернуться</a>
                </div>
                <section className="order-input-title">
                    <p>Давайте начнем.</p>
                    <h1>Обратная связь</h1>
                </section>
                <div className="order-input">
                    <InputField text="Ваше имя" name="user_name" placeholder="Как к вам обращаться?" onChange={handleChange}/>
                    {!callToUser && <InputField text="Телефон" name="phone" placeholder="Ваш мобильный номер телефона" onChange={handleChange}/>}
                </div>
                <div className="order-boxes">
                    {userData && userData.phone && <CheckBox text="Позвонить на номер акаунта" name="userPhone" onChange={handleCallToUser}/>}
                </div>
                <div className="order-services">
                    <h2>Выберите Услуги</h2>
                    <div className="order-services-boxes">
                        <CheckBox text="Купить недвижимость" name="buy" onChange={handleChange}/>
                        <CheckBox text="Ремонт" name="repair" onChange={handleChange}/>
                        <CheckBox text="Строительство недвижимости" name="build" onChange={handleChange}/>
                        <CheckBox text="Создать проект" name="create_project" onChange={handleChange}/>
                        <CheckBox text="Установка систем и оборудования" name="setup_devices" onChange={handleChange}/>
                        <CheckBox text="Терраформинг учатска" name="terraforming" onChange={handleChange}/>
                        <CheckBox text="Строительство фундамента" name="build_foundation" onChange={handleChange}/>
                        <CheckBox text="Другое" name="other" onChange={handleChange}/>
                    </div>
                </div>
                <div className="order-submit">
                    <BlueButton text="Отправить" className="blue-button-submit" onClick={handleSubmit}></BlueButton>
                </div>
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 473 900 128" className="order-bottom">   
            <path d="m0 501 21.5 6.7c21.5 6.6 64.5 20 107.3 27.3 42.9 7.3 85.5 8.7 128.4-.7C300 525 343 505 385.8 501.5c42.9-3.5 85.5 9.5 128.4 17 42.8 7.5 85.8 9.5 128.6 2.3 42.9-7.1 85.5-23.5 128.4-33 42.8-9.5 85.8-12.1 107.3-13.5L900 473v128H0Z" fill="#475264"></path> 
            </svg>
        </div>
    )
}