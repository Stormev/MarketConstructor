import { useState, useEffect } from "react"
import BlueButton from "../blue-button/blue-button"
import "./accountDashboard.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

export default function AccountDashboard(){
    const navigate = useNavigate()

    // Кнопка управления
    const PanelItem = ({text="", img="", id="", onClick=()=>{}}) => {
        return(
            <button className="account-panel-item" id={id} onClick={onClick}>
            <img src={img} alt="icon" />
            <p>{text}</p>
            </button>
        )
    }

    // Статусы
    const cardKeywords = {
        "В процессе приобретения": {color: 'orange'},
        "Приобретено в ипотеку": {color: 'green'},
        "Приобретено": {color: 'green'},
        "Отказ": {color: 'red'},
    };


    // Товар
    const CardItem = ({title, img, cost, precost, size, address, status}) => {
        return(
            <div className="account-content-card">
                <img src={img} alt="image" />
                <h3>{title}</h3>
                <div className="account-content-card-description">
                    {cost && <p>Стоимость: {Intl.NumberFormat("ru-RU").format(cost)} ₽</p>}
                    {precost && <p>Стоимость пред.заказа: {Intl.NumberFormat("ru-RU").format(precost)} ₽</p>}
                    {size && <p>Размер: {size} Кв.м</p>}
                    {address && <p>Адрес: {address}</p>}
                    {status && <span>Статус: <p style={cardKeywords[status]}>{status}</p></span>}
                </div>
                <BlueButton text="Подробней"/>
            </div>
        )
    }

    // Платеж
    const CardCheck = ({title, cost, date, id, }) => {
        return(
            <div className="account-content-check">
                
                <div className="account-content-check-description">
                    <img src="/images/icons/mail.png" alt="icon" />
                    <h3>{title}</h3>
                </div>
                <div className="account-content-check-data">
                    <p>Платеж: {Intl.NumberFormat("ru-RU").format(cost)} ₽</p>
                    <p>Дата: {date}</p>
                    <p>Номер: {id}</p>
                </div>
            </div>
        )
    }

    const menu = [
        {text: "Товары", img: "images/icons/product.png", id: "b11", onClick: ()=>{set_mode(1)}},
        {text: "Пред.заказы", img: "images/icons/letter.png", id: "b12", onClick: ()=>{set_mode(2)}},
        {text: "Платежи", img: "images/icons/money2.png", id: "b13", onClick: ()=>{set_mode(3)}},
        {text: "Отправить заявку", img: "images/icons/letter.png", id: "b14", onClick: ()=>{navigate("/order")}},
    ]

    const other = [
        {text: "Магазин", img: "images/icons/cart.png", id: "b21", onClick: ()=>{navigate("/")}},
        {text: "О нас", img: "images/icons/attention.png", id: "b22", onClick: ()=>{navigate("/about")}},
        {text: "Услуги", img: "images/icons/money2.png", id: "b23", onClick: ()=>{navigate("/services")}},
        {text: "Контакты", img: "images/icons/contacts.png", id: "b24", onClick: ()=>{navigate("/welcome")}},
    ]

    const account = [
        {text: "Тех. Поддержка", img: "images/icons/support.png", id: "b31", onClick: () =>{navigate("/order")}},
        {text: "Данные аккаунта", img: "images/icons/settings.png", id: "b32", onClick: ()=>{set_mode(4)}},
        {text: "Выйти из аккаунта", img: "images/icons/exit.png", id: "b33", onClick: () =>{Logout()}},
    ]

    const Logout = () => {
        localStorage.setItem("access_token", null)
        localStorage.setItem("refresh_token", null)
        navigate('/')
    }

    const GetItems = ({mode=1}) => {
        switch (mode) {
            case 1:
                {
                    return GetProducts()
                }
            case 2:
                {
                    return;
                }
            case 3:
                {
                    return;
                }
            default: return <div>None</div>
        }
    }

    const GetProducts = () => {
        const [product_list, set_product_list] = useState({})
        axios.post(`${api_url}:${api_port}/api/accounts/product/`, {"access_token": localStorage.getItem("access_token")}).then(
            response => {
                const result = response.data['result']
                if (!result) return;
                return (
                    <div>
                        {result.map((element) => {
                            <CardItem title={element.title} img={element.image} cost={element.cost} precost={element.precost} size={element.size} address={element.address} status={element.status}/>
                        })}
                    </div>
                )
            }
        ).catch(error => {
            console.error(error)
        })
    }

    const [activeMenu, setActiveMenu] = useState(false)
    const [mode, set_mode] = useState(1)

    const toggleMenu = () => {
        setActiveMenu(!activeMenu)
    }

    const Board = ({title, img, isOneRow=false, mode=1}) => {
        return (
            <div className="account-content-block">
                <div className="account-content-title">
                    <img src={img} alt="icon" />
                    <h2>{title}</h2>
                    <span/>
                </div>
                <div className={`"account-content-main" ${isOneRow && "account-content-row"}`} id="card-board">
                    {GetItems(mode)}
                </div>
            </div>
        )
    }

    // Пространство для карточек
    const BoardItem = ({mode=1}) => {
        switch (mode) {
            case 1:
                return (<Board title="Товары" img="/images/icons/cart.png"/>);
            case 2:
                return (<Board title="Пред. Заказы" img="/images/icons/letter.png"/>);
            case 3:
                return (<Board title="Платежи" img="/images/icons/money2.png" isOneRow={true}/>);
            case 4:
                return (<Board title="Настройки" img="/images/icons/settings.png" isOneRow={true}/>);
            default:
                return <div>Неизвестная категория</div>;
        }
    }

    // Валидация токена
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post(`${api_url}:${api_port}/api/accounts/token/refresh/`, 
            {"access_token": localStorage.getItem("access_token"), "refresh_token": localStorage.getItem("refresh_token")})
            .then(response=>{
            if (response.data.message === "update_access") {
                localStorage.setItem("access_token", response.data.access_token)
                localStorage.setItem("refresh_token", response.data.refresh_token)
                setLoading(false)
            } else {
                navigate('/login');
            }
        }).catch(error => {
            console.error(error)
            navigate('/login');
        })
    }, []);

    if (loading) {
        return(
            <div>
                <img src="/images/backgroundAbout.png" 
                style={{display: "flex", justifyContent: "center", position: "absolute",top: "20%",left: "40%",borderRadius: "15%",backgroundSize: "cover", alignItems:"center", flex: "0", width: "20vw", aspectRatio: "1/1"}} alt="" />
            </div>
        )
    }

    return(
        <div className="account-body">
            <div className={`account-panel ${activeMenu ? "active" : ""}`}>
                <div className="account-panel-block">
                    <h3>Меню</h3>
                    {menu.map((button, index)=> (
                        <PanelItem text={button.text} img={button.img} id={button.id} onClick={button.onClick} key={button.id}/>
                    ))}
                </div>
                <div className="account-panel-block">
                    <h3>Другое</h3>
                    {other.map((button, index)=> (
                        <PanelItem text={button.text} img={button.img} id={button.id} onClick={button.onClick} key={button.id}/>
                    ))}
                </div>
                <div className="account-panel-block">
                    <h3>Аккаунт</h3>
                    {account.map((button, index)=> (
                        <PanelItem text={button.text} img={button.img} id={button.id} onClick={button.onClick} key={button.id}/>
                    ))}
                </div>
            </div>
            <div className="account-content">
            <div className={`account-menu-body ${activeMenu ? "active" : ""}`}>
                <div className={`account-menu ${activeMenu ? "active" : ""}`} id="account-button-id" onClick={toggleMenu}>
                        <span></span>
                    </div>
                    <label htmlFor='account-button-id'>Меню</label>
                </div>
                <BoardItem mode={mode}/>         
            </div>
        </div>
    )
}