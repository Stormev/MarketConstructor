import { useState } from "react"
import CheckBox from "../checkbox/checkbox"
import "./storeFilter.css"
import Slider from "../slider/slider"
import BlueButton from "../blue-button/blue-button"


// Комопонент фильтр ==============================================
export default function StoreFilter({onSubmit}){
    // Стоимость ==============================================
    const [value, setValue] = useState(10000000)

    // Услуги ==============================================
    const [check_1, set_check_1] = useState(false)
    const [check_2, set_check_2] = useState(false)
    const [check_3, set_check_3] = useState(false)
    const [check_4, set_check_4] = useState(false)

    const [select_1, set_select_1] = useState("0")
    const [select_2, set_select_2] = useState("0")
    const [select_3, set_select_3] = useState("0")
    const [select_4, set_select_4] = useState("0")
    // ======================================================

    // Ручка отправки форма ==============================================
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {};

        data.check = [check_1, check_2, check_3, check_4]

        data.select = [select_1, select_2, select_3, select_4]

        data.max_cost = value
        onSubmit(data);
  };

    // Ручка изменениче чекбокса ==============================================
    const handleCheckboxChange = (e, handle) => {
    handle(e.target.checked);
    };

    // Ручка изменения combobox ==============================================
    const handleSelectChange = (e, handle) => {
        handle(e.target.value);
    };

    // Форма ==============================================
    return(
        <div className="storeFilter-body">
            <form className="storeFilter-filter" onSubmit={handleSubmit}> 
            <section className="storeFilter-cost">
                <h2>Ценовой диапозон</h2>
                <Slider className="slider" min="200000" max="20000000" id="storeFilter-slider" defaultValue="10000000" onChange={(n) => setValue(n.target.value)}/>
                {value<1000000 ? <p>Макс. {Intl.NumberFormat("ru-RU").format(value)} тыс. ₽</p> 
                : <p>Макс. {Intl.NumberFormat("ru-RU").format(value)} млн. ₽</p>}  
            </section>
            <section className="storeFilter-type">
                <h2>Характеристики</h2>
                <div className="storeFilter-type-select">
                    <select defaultValue={"0"} onChange={(e)=>{handleSelectChange(e, set_select_1)}}>
                        <option value="0" name="type0" id="type0">Материал</option>
                        <option value="1" name="type1" id="type1">Каменные конструкции</option>
                        <option value="2" name="type2" id="type2">Деревянные конструкции</option>
                        <option value="3" name="type3" id="type3">Железобетонные конструкции</option>
                        <option value="4" name="type4" id="type4">Газоблочные конструкции</option>
                    </select>
                    <select defaultValue={"0"} onChange={(e)=>{handleSelectChange(e, set_select_2)}}>
                        <option value="0" name="city0" id="city0">Город</option>
                        <option value="1" name="city01" id="city1">Москва</option>
                    </select>
                    <select defaultValue={"0"} onChange={(e)=>{handleSelectChange(e, set_select_3)}}>
                        <option value="0" name="room00" id="room0">Тип</option>
                        <option value="1" name="room1" id="room1">Квартира</option>
                        <option value="2" name="room2" id="room2">Частный дом</option>
                        <option value="3" name="room3" id="room3">Сооружение</option>
                    </select>
                    <select defaultValue={"0"} onChange={(e)=>{handleSelectChange(e, set_select_4)}}>
                        <option value="0" name="size0" id="size0">Кв. м</option>
                        <option value="1" name="size1" id="size1">Меньше 20 кв.м</option>
                        <option value="2" name="size2" id="size2">Меньше 35 кв.м</option>
                        <option value="3" name="size3" id="size3">Больше 48 кв.м</option>
                    </select>
                </div>
            </section>
            <div className="storeFilter-additional">
                <CheckBox text="Дополнительные комнаты" className="check-box-small" onChange={(e)=>{handleCheckboxChange(e, set_check_1)}}/>
                <CheckBox text="Отделка" className="check-box-small" onChange={(e)=>{handleCheckboxChange(e, set_check_2)}}/>
                <CheckBox text="Ипотека" className="check-box-small" onChange={(e)=>{handleCheckboxChange(e, set_check_3)}}/>
                <CheckBox text="Акции и скидки" className="check-box-small" onChange={(e)=>{handleCheckboxChange(e, set_check_4)}}/>
            </div>
                <BlueButton type="submit" text="Найти" className="storeFilter-button"/>
            </form>
        </div>
    )
}