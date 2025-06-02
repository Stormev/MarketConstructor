import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import BlueButton from "../blue-button/blue-button"
import "./accountDashboard.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import InputField from "../input-field/input"

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

export default function AccountDashboard(){
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState(false)
    const [mode, set_mode] = useState(1)
    const [items, set_items] = useState([])
    const isfetch = useRef(false)
    const [user_data, set_user_data] = useState({})

    const toggleMenu = () => {
        setActiveMenu(!activeMenu)
    }

    // Кнопка управления
    const PanelItem = ({text="", img="", id="", onClick=()=>{}}) => {
        return(
            <button type="button" className="account-panel-item" id={id} onClick={onClick}>
            <img src={img} alt="icon" draggable={false}/>
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
    const CardItem = ({title, img, cost, precost, size, address, status, link=""}) => {
        // Статус на основании владения
        return(
            <div className="account-content-card">
                <img src={img ? `${api_url}:${api_port}${img['image']}` : "/images/project-house.png"} alt="image" onClick={()=>{navigate(`/product/${link}`)}}/>
                <h3>{title}</h3>
                <div className="account-content-card-description">
                    {cost && <p>Стоимость: {Intl.NumberFormat("ru-RU").format(cost)} ₽</p>}
                    {precost && <p>Стоимость пред.заказа: {Intl.NumberFormat("ru-RU").format(precost)} ₽</p>}
                    {size && <p>Размер: {size} Кв.м</p>}
                    {address && <p>Адрес: {address}</p>}
                    {status && <span>Статус: <p style={cardKeywords[status]}>{status}</p></span>}
                </div>
                <BlueButton text="Подробней" onClick={()=>{navigate(`/product/${link}`)}}/>
            </div>
        )
    }

    // Платеж
    const CardCheck = ({title, cost, date, id, id_provider="Нет данных"}) => {
        return(
            <div className="account-content-check">
                
                <div className="account-content-check-description">
                    <img src="/images/icons/mail.png" alt="icon" />
                    <h3>{title}</h3>
                </div>
                <div className="account-content-check-data">
                    <p>{Intl.NumberFormat("ru-RU").format(cost)} ₽</p>
                    <p>Дата: {date}</p>
                    <p>Номер: {id}</p>
                    <p>Транзакция: {id_provider}</p>
                </div>
            </div>
        )
    }

    const UpdateUserData = () => {
        axios.put(`${api_url}:${api_port}/api/accounts/user/update`, {
            access_token: localStorage.getItem("access_token"),
            mail: user_data.mail,
            phone: user_data.phone,
            old_password: user_data.old_password || "",
            new_password: user_data.new_password || ""
        }).then(response=>{
            if(!response.data) return;
            set_items(response.data)
            isfetch.current = true
            alert("Успешно")
        }).catch(err=>{
            console.error(err)
            alert("Неправильные данные")
        });
    }

    const UserSettings = () => {

        const changeData = (field, value) => {
            set_user_data(prev => ({
                ...prev,
                [field]: value
            }))
        }

        useEffect(()=> {
                axios.post(`${api_url}:${api_port}/api/accounts/user/`, {
                    access_token: localStorage.getItem("access_token"),
                }).then(response=>{
                    if(!response.data || (user_data && Object.keys(user_data).length > 0)) return;
                    set_user_data(response.data)
                }).catch(err=>{
                    if (err?.data?.message === "invalid_access_token") {
                        setReValid(!reValid)}
                    console.error(err)
                });
        }, [])

        if (user_data) {
        return (
            <div className="account-settings-body">
                <div className="account-settings-data">
                    <InputField text="Почта" defaultValue={user_data.mail} onChange={(e) => changeData("mail", e.target.value)}/>
                    <InputField text="Телефон" defaultValue={user_data.phone} onChange={(e) => changeData("phone", e.target.value)}></InputField>
                </div>
                <span></span>
                <p>Смена пароля</p>
                <div className="account-settings-password">
                    <InputField text="Текущий пароль" value={user_data.old_password} onChange={(e) => changeData("old_password", e.target.value)}/>
                    <InputField text="Новый пароль" onChange={(e) => changeData("new_password", e.target.value)}/>
                </div>
                <BlueButton text="Сохранить" onClick={UpdateUserData}/>
            </div>
        )}
        return (<div>Загрузка...</div>)
    }

    const menu = useMemo(() =>[
        {text: "Товары", img: "/images/icons/product.png", id: "b11", onClick: ()=>{set_mode(1)}},
        {text: "Пред.заказы", img: "/images/icons/letter.png", id: "b12", onClick: ()=>{set_mode(2)}},
        {text: "Платежи", img: "/images/icons/money2.png", id: "b13", onClick: ()=>{set_mode(3)}},
        {text: "Отправить заявку", img: "/images/icons/letter.png", id: "b14", onClick: ()=>{navigate("/order")}},
    ], [mode])

    const other = useMemo(() =>[
        {text: "Магазин", img: "/images/icons/cart.png", id: "b21", onClick: ()=>{navigate("/")}},
        {text: "О нас", img: "/images/icons/attention.png", id: "b22", onClick: ()=>{navigate("/about")}},
        {text: "Услуги", img: "/images/icons/money2.png", id: "b23", onClick: ()=>{navigate("/services")}},
        {text: "Контакты", img: "/images/icons/contacts.png", id: "b24", onClick: ()=>{navigate("/welcome")}},
    ], [mode])

    const account = useMemo(() =>[
        {text: "Тех. Поддержка", img: "/images/icons/support.png", id: "b31", onClick: () =>{navigate("/order")}},
        {text: "Данные аккаунта", img: "/images/icons/settings.png", id: "b32", onClick: ()=>{set_mode(4)}},
        {text: "Выйти из аккаунта", img: "/images/icons/exit.png", id: "b33", onClick: () =>{Logout()}},
    ], [mode])

    const Logout = () => {
        localStorage.setItem("access_token", null)
        localStorage.setItem("refresh_token", null)
        navigate('/')
    }
    
    const getPreOrder = () => {
    axios.post(`${api_url}:${api_port}/api/accounts/preorder/`, {
        access_token: localStorage.getItem("access_token"),
    }).then(response=>{
        if(!response.data) return;
        set_items(response.data)
        isfetch.current = true
    }).catch(err=>{
        if (err?.data?.message === "invalid_access_token") {
            setReValid(!reValid)
        }
        console.error(err)
    });
    }

    const getProducts = () => {
    axios.post(`${api_url}:${api_port}/api/accounts/product/`, {
        access_token: localStorage.getItem("access_token"),
    }).then(response=>{
        if(!response.data) return;
        set_items(response.data)
        isfetch.current = true
    }).catch(err=>{
        console.log(err?.data?.message === "invalid_access_token")
        if (err?.data?.message === "invalid_access_token") {
            setReValid(!reValid)
        }
        console.error(err)
    });};

    const getChecks = () => {
    axios.post(`${api_url}:${api_port}/api/accounts/checks/`, {
        access_token: localStorage.getItem("access_token"),
    }).then(response=>{
        if(!response.data) return;
        set_items(response.data)
        isfetch.current = true
    }).catch(err=>{
        
        if (err?.data?.message === "invalid_access_token") {
            setReValid(!reValid)
        }
        console.error(err)
    });};

    // Пространство для карточек
    const BoardItem = () => {
        switch (mode) {
            case 1:
                return <Board title="Товары" img="/images/icons/cart.png"/>;
            case 2:
                return <Board title="Пред. Заказы" img="/images/icons/letter.png"/>;
            case 3:
                return <Board title="Платежи" img="/images/icons/money2.png" isOneRow={true}/>;
            case 4:
                return <Board title="Настройки" img="/images/icons/settings.png" isOneRow={true}/>;
            default:
                return <div>Неизвестная категория</div>;
        }
    }

    const GetItems = () => {
        if (isfetch.current) return;
        switch (mode) {
            case 1:
                {
                    return getProducts()
                }
            case 2:
                {
                    return getPreOrder();
                }
            case 3:
                {
                    return getChecks();
                }
            case 4:
                {
                    return getChecks();
                }
            default: return <div>None</div>
        }
    }

    const Board = ({title, img, isOneRow=false}) => {
        useEffect(()=> {
            GetItems()
        }, [mode])
        return (
            <div className="account-content-block">
                <div className="account-content-title">
                    <img src={img} alt="icon" />
                    <h2>{title}</h2>
                    <span/>
                </div>
                <div className={`account-content-main ${isOneRow && "account-content-row"}`} id="card-board">
                    {items && Array.isArray(items) && [1, 2].includes(mode) &&
                    items.map((element)=>{
                        return <CardItem title={element.title} link={element.product_id} key={element.product_id} img={element.images && element.images[0]} cost={element.cost} precost={element.precost} size={element.size} address={element.address} status={element.status}/>
                    })
                    }
                    {items && Array.isArray(items) && mode===3 &&
                    items.map((element)=>{
                        return <CardCheck title={element.title} key={element.payment_id} cost={element.amount} date={element.updated_at} id={element.payment_id} id_provider={element.provider_payment_id}/>
                    })
                    }
                    {mode===4 && <UserSettings/>}
                </div>
            </div>
        )
    }

    useEffect(() => {
        isfetch.current = false
        set_items([])
    }, [mode]);

    // Валидация токена
    const [loading, setLoading] = useState(true);
    const [reValid, setReValid] = useState(false)

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
    }, [reValid]);

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
                {/* контент */}
                <BoardItem/>
            </div>
        </div>
    )
}