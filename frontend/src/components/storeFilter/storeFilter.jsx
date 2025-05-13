import { useState } from "react"
import CheckBox from "../checkbox/checkbox"
import "./storeFilter.css"
import Slider from "../slider/slider"
import BlueButton from "../blue-button/blue-button"

export default function StoreFilter(){
    const [value, setValue] = useState(10000000)
    return(
        <div className="storeFilter-body">
            <div className="storeFilter-filter"> 
            <section className="storeFilter-cost">
                <h2>Ценовой диапозон</h2>
                <Slider className="slider" min="200000" max="20000000" id="storeFilter-slider" defaultValue="10000000" onChange={(n) => setValue(n.target.value)}/>
                {value<1000000 ? <p>Макс. {Intl.NumberFormat("ru-RU").format(value)} тыс. ₽</p> 
                : <p>Макс. {Intl.NumberFormat("ru-RU").format(value)} млн. ₽</p>}  
            </section>
            <section className="storeFilter-type">
                <h2>Характеристики</h2>
                <div className="storeFilter-type-select">
                    <select>
                        <option value="" name="type0" id="type0">Тип сооружения</option>
                        <option value="" name="type1" id="type1">Каменные конструкции</option>
                        <option value="" name="type2" id="type2">Деревянные конструкции</option>
                        <option value="" name="type3" id="type3">Железобетонные конструкции</option>
                        <option value="" name="type4" id="type4">Газоблочные конструкции</option>
                    </select>
                    <select>
                        <option value="" name="city0" id="city0">Город</option>
                        <option value="" name="city01" id="city1">1</option>
                    </select>
                    <select>
                        <option value="" name="room0" id="room0">Студия</option>
                        <option value="" name="room1" id="room1">Квартира</option>
                        <option value="" name="room2" id="room2">Частный дом</option>
                        <option value="" name="room3" id="room3">Малое сооружение</option>
                    </select>
                    <select>
                        <option value="" name="size0" id="size0">Кв. м</option>
                        <option value="" name="size1" id="size1">Меньше 20 кв.м</option>
                        <option value="" name="size2" id="size2">Меньше 35 кв.м</option>
                        <option value="" name="size3" id="size3">Больше 48 кв.м</option>
                    </select>
                </div>
            </section>
            <div className="storeFilter-additional">
                <CheckBox text="Дополнительные комнаты" className="check-box-small"/>
                <CheckBox text="Отделка" className="check-box-small"/>
                <CheckBox text="Ипотека" className="check-box-small"/>
                <CheckBox text="Акции и скидки" className="check-box-small"/>
            </div>
            <BlueButton text="Найти" className="storeFilter-button"/>
            </div>
        </div>
    )
}