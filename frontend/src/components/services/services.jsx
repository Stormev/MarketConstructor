import BlueButton from '../blue-button/blue-button'
import CardService from '../CardService/card'
import user_replace from '../../scripts/replace.js'
import './services.css'

// Компонент для layout ==============================================
export default function Services(){
    return(
        <div className='services-body'>
            <section className='services-title'>
                <h1>Наши услуги</h1>
                <div className='serices-line'/>
            </section>
            {/* Карточки с услугами ============================================== */}
            <div className='services-main'>
                <CardService title='Строительство частных домов' cost='800тыс.' time='6 месяцев' endtime='1.5 года' image='/images/cards/house.png'/>
                <CardService title='Строительство многоэтажных домов' cost='2 млн.' time='1.5 года' endtime='' image='/images/cards/flat.png'/>
                <CardService title='Строительство малой площади' cost='50 тыс.' time='6 месяцец' endtime='1.5 года' image='/images/cards/garage.png'/>
                <CardService title='Постройка ограждений' cost='15 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/wall.png'/>
                <CardService title='Проведение экспертизы' cost='15 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/worker.png'/>
                <CardService title='Ремонт любой сложности' cost='5 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/project.png'/>
                <CardService title='Постройка теплиц' cost='8 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/greenhouse.png'/>
                <CardService title='Проектирование дизайнерких построек' cost='30 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/goodHouse.png'/>
                <CardService title='Составление сметы' cost='30 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/projectBlue.png'/>
                <CardService title='Прокладка кабелей' cost='2тыс.' time='1 месяц' endtime='1.5 года' image='/images/cards/wire.png'/>
                <CardService title='Установка системы “Умный дом”' cost='7 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/smartHouse.png'/>
                <CardService title='Заложение фундамента' cost='90 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/fundament.png'/>
                <CardService title='Установка пожарной сигнализации' cost='10 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/detector.png'/>
                <CardService title='Установка камер' cost='2 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/camera.png'/>
                <CardService title='Терраформинг участка' cost='150 тыс.' time='1 месяца' endtime='1.5 года' image='/images/cards/excavator.png'/>
            </div>
            <div className='services-bottom'>
                <div className='services-bottom-title'>
                    <div className='services-bottom-line'/>
                    <h3>Не нашли нужную услугу? Позвоните нам или оставте заявку</h3>
                    <div className='services-bottom-line'/>
                </div>
                <div className='services-bottom-list'>
                    <BlueButton text={'Оставить заявку'} className='blue-button-medium' onClick={()=>user_replace('order')}/>
                    <BlueButton text={'Посмотреть контакты'} className='blue-button-medium' onClick={()=>user_replace('welcome')}/>
                </div>
            </div>
        </div>
    )
}
