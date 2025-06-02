import "./payment.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlueButton from "../blue-button/blue-button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

// Карточка платежа ==============================================

const PaymentCard = ({tooltip="Способ оплаты", image="/images/icons/aspect.png", onClick=(()=>{}), request=""}) => {
    return(
        <button className="payment-methods-card" onClick={onClick} style={{backgroundImage: `url(${image})`}}>
            <div className="payment-methods-card-tooltip"><p>{tooltip}</p></div>
        </button>
    )
}


// Подсказки ==============================================
const tips = [
            "После пред. оплаты, в течение 6 месяцев никто не сможет приобрести эту квартиру, кроме вас.", 
            "Пред. Оплата гарантирует что только вы можете претендовать на товар в течение промежутка времени"
            ]


export default function Payment(){
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    // Ссылка на платеж ==============================================
    const [paymentLink, setPaymentLink] = useState("")
    const [paymentLoading, setPaymentLoading] = useState(false)

    // Валидация токена ==============================================
    const [reValid, setReValid] = useState(false)

    // Способы оплаты ==============================================
    const payment_options = [{tooltip: "ВТБ банк", icon: "/images/icons/payment/vtb.png", request: ""}]

    // Изображения по умолчанию ==============================================
    const test_images = [
        'https://picsum.photos/id/1011/600/400',
        'https://picsum.photos/id/1012/600/400',
        'https://picsum.photos/id/1013/600/400',
        'https://picsum.photos/id/1015/600/400',
    ];
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigate = useNavigate()

    // Валидация токена
    useEffect(() => {
        axios.post(`${api_url}:${api_port}/api/accounts/token/refresh/`, 
            {"access_token": localStorage.getItem("access_token"), "refresh_token": localStorage.getItem("refresh_token")})
            .then(response=>{
            if (response.data.message === "update_access") {
                localStorage.setItem("access_token", response.data.access_token)
                localStorage.setItem("refresh_token", response.data.refresh_token)
            } else {
                navigate('/login');
            }
        }).catch(error => {
            console.error(error)
            navigate('/login');
        })
    }, [reValid]);

    // Получение товара ==============================================
    useEffect(()=>{
        axios.get(`${api_url}:${api_port}/api/store/product/${id}`)
        .then((response => {
            if (!response?.data) {return;}
            setProduct(response.data)
            setLoading(false)
        }))
        .catch((error)=> {
            console.error(error)
            alert("Ошибка")
        })
    }, [])

    // Экран загрузки ==============================================
    if (loading) {
        return(
            <div>
                <img src="/images/backgroundAbout.png" 
                style={{display: "flex", justifyContent: "center", position: "absolute",top: "20%",left: "40%",borderRadius: "15%",backgroundSize: "cover", alignItems:"center", flex: "0", width: "20vw", aspectRatio: "1/1"}} alt="" />
            </div>
        )
    }

    // const dots = (totalLength, label, value) => {
    //     return '.'.repeat(totalLength - (label.length + value.length));
    // }

    // Создание платежа ==============================================
    const CreatePayment = () => {
        if (paymentLoading) {return;}
        setPaymentLoading(true)
        axios.post(`${api_url}:${api_port}/api/payments/preorder/`, {
            access_token: localStorage.getItem("access_token"),
            refresh_token: localStorage.getItem("refresh_token"),
            product_id: id
        }).then((responce)=>{
            if (responce?.data?.link) {
                setPaymentLink(responce.data.link)
                window.location.href = responce.data.link;
            }
        }).catch((error)=>{
            console.error(error)
            alert("Ошибка")
            setPaymentLoading(false)
        })
    }

    return (
        <div className="payment__body" style={{backgroundImage: "url(/images/welcome-background.png)"}}>
            <div className="payment__content">
                <div className="payment__content__back">
                    <a href="#" onClick={()=>navigate(-1)}>{"<"} Вернуться</a>
                </div>
                <div className="payment__content__title">
                    <h1>Предварительная</h1>
                    <h2>Оплата</h2>
                </div>
                <span/>
                <div className="payment__content__data">
                    <div className="payment__content__data__item">
                        <img src="/images/icons/product.png"/>
                        <h3>Товар: {product.title}</h3>
                    </div>
                    <div className="payment__content__data__item">
                        <img src="/images/icons/work.png"/>
                        <h3>Время ожидания: ~{Math.floor(Math.random()*100)+1}s</h3>
                    </div>
                    {console.log(product.images.length)}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Thumbs, FreeMode]}
                        className="payment__content__data__swiper"
                        >
                        {product.images && product.images.length > 0 ? 
                            product.images.map((src, i) => (
                            <SwiperSlide key={i}>
                                <img src={`${api_url}:${api_port}${src['image']}`} alt={`Slide ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </SwiperSlide>
                        )) :
                            test_images.map((src, i) => (
                            <SwiperSlide key={i}>
                                <img src={src} alt={`Slide ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <h2>{Intl.NumberFormat("ru-RU").format(product.precost)} ₽</h2>
                </div>
                <span/>
                {paymentLink && <a className="payment__content__link" href={paymentLink}>Перейти к платежу</a>}
                {/* <div className="payment__content__tip">
                    <p>{tips[Math.floor(Math.random() * tips.length)]}</p>
                </div> */}
                <BlueButton onClick={CreatePayment}>{paymentLoading ? <img className="payment__loading" src="/images/icons/loading.png"/>: "Оплатить"}</BlueButton>
            </div>
        </div>
    )
}

// export default function LegacyPayment(){
//     const { id } = useParams();
//     const [product, setProduct] = useState({})
//     const [loading, setLoading] = useState(true)

//     // Валидация токена ==============================================
//     const [reValid, setReValid] = useState(false)

//     // Способы оплаты ==============================================
//     const payment_options = [{tooltip: "ВТБ банк", icon: "/images/icons/payment/vtb.png", request: ""}]

//     const navigate = useNavigate()

//     useEffect(() => {
//         axios.post(`${api_url}:${api_port}/api/accounts/token/refresh/`, 
//             {"access_token": localStorage.getItem("access_token"), "refresh_token": localStorage.getItem("refresh_token")})
//             .then(response=>{
//             if (response.data.message === "update_access") {
//                 localStorage.setItem("access_token", response.data.access_token)
//                 localStorage.setItem("refresh_token", response.data.refresh_token)
//             } else {
//                 navigate('/login');
//             }
//         }).catch(error => {
//             console.error(error)
//             navigate('/login');
//         })
//     }, [reValid]);

//     // Получение товара ==============================================
//     useEffect(()=>{
//         axios.get(`${api_url}:${api_port}/api/store/product/${id}`)
//         .then((response => {
//             if (!response?.data) {return;}
//             setProduct(response.data)
//             setLoading(false)
//         }))
//         .catch((error)=> {
//             console.error(error)
//             alert("Ошибка")
//         })
//     }, [])

//     // Экран загрузки ==============================================
//     if (loading) {
//         return(
//             <div>
//                 <img src="/images/backgroundAbout.png" 
//                 style={{display: "flex", justifyContent: "center", position: "absolute",top: "20%",left: "40%",borderRadius: "15%",backgroundSize: "cover", alignItems:"center", flex: "0", width: "20vw", aspectRatio: "1/1"}} alt="" />
//             </div>
//         )
//     }

//     // Форма покупки ==============================================
//     return(
//         <div className="payment-body" style={{backgroundImage: "url(/images/welcome-background.png)"}}>
//             <div className="payment-inf">
//                 <div className="payment-inf-data">
//                     <div className="payment-inf-data-item">
//                         <img src="/images/icons/stack.png" alt="icon" />
//                         <h2>Ваш товар / Услуга</h2>
//                     </div>
//                     <h2>{product.title || "Нет данных"}</h2>
//                     <div className="payment-inf-data-values">
//                         {/* Посути продается только услуга предопалты (нет смысла делать динамически) =============================================================================== */}
//                         <h3>Операция: Пред.Оплата</h3>
//                         <div className="payment-inf-data-item-cost">
//                             <img src="/images/icons/money2.png" alt="icon" />
//                             <h3>Стоимость: {Math.floor(product.precost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₽</h3>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="payment-inf-tip">
//                     <div className="payment-inf-tip-item">
//                             <img src="/images/icons/tip.png" alt="icon" />
//                             <h2>Преймущества</h2>
//                     </div>
//                     <p>{tips[Math.floor(Math.random() * tips.length)]}</p>
//                 </div>
//             </div>
//             <div className="payment-methods">
//                 <div className="payment-methods-title">
//                     <img src="/images/icons/cart.png" alt="icon" />
//                     <h1>Выберите способ оплаты</h1>
//                     <span/>
//                 </div>
//                 <div className="payment-methods-content">
//                     {payment_options.map((option, index)=> {
//                         return <PaymentCard key={index} tooltip={option.tooltip} image={option.icon} request={option.request}/>
//                     })}
                    
//                 </div>
//             </div>
//         </div>
//     )
// }