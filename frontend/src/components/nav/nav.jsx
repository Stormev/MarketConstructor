import './nav.css'
import Logo from '../logo/logo.jsx'
import ButtonProfile from '../button-profile/button-profile.jsx'
import MenuController from '../../scripts/navMenu.js'

export default function Nav(){
    return (
        <nav className='nav-nav'>
            <div className='nav-body'>
                <Logo className="logo-margin"/>
                <div className='nav-elements'>
                    <ul className='nav-bar'>
                    <li><a href="/" className='nav-link'>Купить недвижимость</a></li>
                    <li><a href="/services" className='nav-link'>Услуги</a></li>
                    <li><a href="/about" className='nav-link'>О нас</a></li>
                    {/* <li><a href="/stock" className='nav-link'>Акции</a></li> */}
                    <li><a href="/welcome" className='nav-link'>Контакты</a></li>
                    <li><a href="/order" className='nav-link'>Заказать услугу</a></li>
                    <li><a href="/rate" className='nav-link'>Отзывы</a></li>
                    </ul>
                    {/* <a href='localhost:3000' className='nav-link'>Купить недвижимость</a>
                    <a href='localhost:3000' className='nav-link'>Услуги</a>
                    <a href='localhost:3000' className='nav-link'>О нас</a>
                    <a href='localhost:3000' className='nav-link'>Акции</a>
                    <a href='localhost:3000' className='nav-link'>Контакты</a>
                    <a href='localhost:3000' className='nav-link'>Заказать услугу</a>
                    <a href='localhost:3000' className='nav-link'>Отзывы</a> */}
                </div>
                <div className='nav-menu-body' onClick={MenuController}>
                    <div className='nav-menu' id='nav-button-id'>
                        <span></span>
                    </div>
                    <label htmlFor='nav-button-id'>Меню</label>
                </div>
                <ButtonProfile></ButtonProfile>
            </div>
            <div className='nav-menu-content' id='nav-menu-id'>
                    <ul className='nav-menu-bar'>
                        <li><a href="/">Купить недвижимость</a></li>
                        <span/>
                        <li><a href="/services">Услуги</a></li>
                        <li><a href="/about">О нас</a></li>
                        {/* <li><a href="/stock" className='nav-link'>Акции</a></li> */}
                        <li><a href="/welcome">Контакты</a></li>
                        <li><a href="/order">Заказать услугу</a></li>
                        <li><a href="/rate">Отзывы</a></li>
                    </ul>
                </div>
        </nav>
    )
}