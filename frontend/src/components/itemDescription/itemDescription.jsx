import "./itemDescription.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from "react";
import CalcMortgage from "../calcMortgage/mortgage";
import BlueButton from "../blue-button/blue-button";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

// Главный компонент принимает данные из itemDescriptionLayout ==============================================
export default function ItemDescription({title, cost, address, images, description="Описание отсутствует", year, constructionType="Сооружение", 
    material, mortgage, comfort, rooms, services, size, facing, item_link}){
        const [thumbsSwiper, setThumbsSwiper] = useState(null);
        const navigate = useNavigate()

        // Изображения по умолчанию ==============================================
        const test_images = [
          'https://picsum.photos/id/1011/600/400',
          'https://picsum.photos/id/1012/600/400',
          'https://picsum.photos/id/1013/600/400',
          'https://picsum.photos/id/1015/600/400',
        ];
        
    // Форма ==============================================
    return(
        <div className="itemDescription-body">
            <div className="itemDescription-content">
            <div className="itemDescription-content-title">
                <h1>{title}, {size} кв.м</h1>
                <p>{address}</p>
            </div>
                <div className="itemDescription-content-image">
                    <Swiper
                        className="itemDescription-content-image-slider"
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[Thumbs, Navigation]}
                        >
                        {images ? 
                            images.map((src, i) => (
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
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Thumbs, FreeMode]}
                        className="itemDescription-content-image-thumbnails"
                        >
                        {images ? 
                            images.map((src, i) => (
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
                </div>
                <div className="itemDescription-content-attribute">
                    <h2>Характеристики</h2>
                    <p>{constructionType}</p>
                    <div className="itemDescription-content-attribute-list">
                        <div className="itemDescription-content-attribute-item">
                            <img src="/images/icons/stack.png" alt="icon" />
                            <p>Основной материал: {material}</p>
                        </div>
                        <div className="itemDescription-content-attribute-item">
                            <img src="/images/icons/calendar.png" alt="icon" />
                            <p>Год постройки: {year}</p>
                        </div>
                        <div className="itemDescription-content-attribute-item">
                            <img src="/images/icons/list1.png" alt="icon" />
                            <p>Ипотека: {mortgage ? "Возможна" : "Недоступно"}</p>
                        </div>
                        <div className="itemDescription-content-attribute-item">
                            <img src="/images/icons/comfort.png" alt="icon" />
                            <p>Класс: {comfort}</p>
                        </div>

                        <div className="itemDescription-content-attribute-item">
                            <img src="/images/icons/interior.png" alt="icon" />
                            <p>Кол-во комнат: {rooms}</p>
                        </div>
                        <div className="itemDescription-content-attribute-item">
                            <img src="/images/icons/aspect.png" alt="icon" />
                            <p>Площадь: {size} кв.м</p>
                        </div>
                        {facing ? 
                            <div className="itemDescription-content-attribute-item">
                                <img src="/images/icons/work.png" alt="icon" />
                                <p>Отделка: с отделкой</p>
                            </div>
                            :
                            <div className="itemDescription-content-attribute-item">
                                <img src="/images/icons/work.png" alt="icon" />
                                <p>Отделка: Без отделки</p>
                            </div>
                            }
                        <div className="itemDescription-content-attribute-item">
                            <img src="/images/icons/services.png" alt="icon" />
                            <p>ЖКХ: {services ? "Подключено" : "Отсутсвует"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="itemDescription-data">
                <div className="itemDescription-data-main">
                    <h1>{cost ? Math.floor(cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : "Неизвестно"} ₽</h1>
                    <div className="itemDescription-data-main-attribute">
                        {size && cost &&
                            <div className="itemDescription-data-attribute-item">
                                <img src="/images/icons/money2.png" alt="icon" />
                                <p>Цена за метр: {Intl.NumberFormat("ru-RU").format(cost/size)} ₽</p>
                            </div>
                        }
                        {comfort && 
                            <div className="itemDescription-data-attribute-item">
                                <img src="/images/icons/comfort.png" alt="icon" />
                                <p>Класс: {comfort}</p>
                            </div>}
                        <div className="itemDescription-data-attribute-item">
                            <img src="/images/icons/services.png" alt="icon" />
                            <p>ЖКХ: {services ? "Подключено" : "Отсутсвует"}</p>
                        </div>
                        {year && 
                            <div className="itemDescription-data-attribute-item">
                                <img src="/images/icons/calendar.png" alt="icon" />
                                <p>Год постройки: {year}</p>
                            </div>}
                        <div className="itemDescription-data-attribute-item">
                            <img src="/images/icons/list1.png" alt="icon" />
                            <p>Ипотека: {mortgage ? "Возможна" : "Недоступно"}</p>
                        </div>
                    </div>
                    <div className="itemDescription-content-attribute-item itemDescription-content-attribute-item-title">
                        <img src="/images/icons/list1.png" alt="icon" />
                        <h2>Ипотека</h2>
                    </div>
                    <div className="itemDescription-data-main-motrgage">
                        <CalcMortgage product={true}/>
                    </div>
                    <div className="itemDescription-data-main-buttons">
                        <BlueButton text="Внести пред. оплату" onClick={()=>navigate(`/payments/preorder/${item_link}`)}/>
                        <BlueButton text="Покупка без пред. оплаты" onClick={()=>navigate("/order")}/>
                    </div>
                </div>
                <div className="itemDescription-data-description">
                    <h2>Описание проекта</h2>
                    <p style={{whiteSpace: 'pre-line'}}>{description}</p>
                </div>
            </div>
        </div>
    )
}