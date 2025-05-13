import BlueButton from "../blue-button/blue-button"
import "./storeCard.css"

export default function StoreCard({title="Нет данных", cost="Нет данных", precost="Нет данных", itemlink="Нет данных", images={}, location="Нет данных", material="Нет данных", year="Нет данных", mortgage="Нет данных", comfort="Нет данных", count_rooms="Нет данных", size="Нет данных", facing="Нет данных", service="Нет данных"}){
    return(
        <div className="storeCard-body">
            <div className="storeCard-main">
                <div className="storeCard-layer-main">
                    <div className="storeCard-image">
                        <img src="/images/project-house.png" alt="Изображение структуры" />
                    </div>
                    <div className="storeCard-content">
                        <h3>{title}</h3>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/location.png" alt="Иконка" />
                            <p>Адресс: {location}</p>
                        </div>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/stack.png" alt="Иконка" />
                            <p>Основной материал: {material}</p>
                        </div>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/calendar.png" alt="Иконка" />
                            <p>Год постройки: {year}</p>
                        </div>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/list1.png" alt="Иконка" />
                            <p>Ипотека: {mortgage}</p>
                        </div>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/comfort.png" alt="Иконка" />
                            <p>Класс: {comfort}</p>
                        </div>
                    </div>
                    <div className="storeCard-content">
                    <h3>Характеристики</h3>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/interior.png" alt="Иконка" />
                            <p>Кол-во комнат: {count_rooms}</p>
                        </div>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/aspect.png" alt="Иконка" />
                            <p>Площадь: {size}</p>
                        </div>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/work.png" alt="Иконка" />
                            <p>Вариант отделки: {facing}</p>
                        </div>
                        <div className="storeCard-icon-text">
                            <img src="/images/icons/services.png" alt="Иконка" />
                            <p>ЖКХ: {service}</p>
                        </div>
                    </div>
                    <div className="storeCard-additional">
                        <BlueButton text="Подробней"/>
                    </div>
                </div>
                <div className="storeCard-layer-bottom">
                    <h1>{cost} ₽</h1>
                    <h3>Пред. Оплата: {precost} ₽</h3>
                    <BlueButton text="Покупка без пред. оплаты"/>
                    <BlueButton text="Внести пред. оплату"/>
                </div>
            </div>
        </div>
    )
}