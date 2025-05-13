import './welcome.css'
import Logo from '../logo/logo.jsx'
import BlueButton from '../blue-button/blue-button.jsx'
import user_replace from '../../scripts/replace.js'

export default function Welcome(){
    return (
        <div className='welcome-body' style={{backgroundImage: "url('/images/welcome-background.png')"}}>
            <section className='welcome-about'>
            <Logo className="logo-biggest logo-white logo-no-wargin"/>
            <p>Двери открыты для тех,<br/> кто ищет надежность и<br/> качество в каждом квадратном <br/> метре.</p>
            <section className='welcome-contacts'>
                <h4>Наши контакты:</h4>
                <a href='/'>Почта: OurCluchevik@mail.ru</a>
                <a href='/'>Телефон №1: +8 414 412 12 12</a>
                <a href='/'>Телефон №2: +8 221 522 32 23</a>
            </section>
            </section>
            <script src='scripts/replace.js'/>
            <div className='welcome-selection'>
                <BlueButton className="blue-button-big" onClick={() =>{user_replace('')}} text="Купить недвижимость"/>
                <BlueButton className="blue-button-big" onClick={() =>{user_replace('order')}}  text="Оставить заявку"/>
                <BlueButton className="blue-button-big" onClick={() =>{user_replace('services')}}  text="Наши услуги"/>
                <BlueButton className="blue-button-big" onClick={() =>{user_replace('about')}}  text="О нашей компании"/>
            </div>
        </div>
    )}