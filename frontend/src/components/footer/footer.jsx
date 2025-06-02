import './footer.css'
import Logo from '../logo/logo.jsx'

export default function Footer(){
    
    // Главный компонент ==============================================
    return (
        <footer className='footer-body'>
            <div className='footer-start'>
                <Logo className='logo-white logo-margin-top logo-bigger' />
                <div className='footer-social'>
                    <a href='https://www.youtube.com/'><img src="/images/youtube-logo.png" alt="" /></a>
                    <a href="https://vk.com/"><img src="/images/vk-logo.png" alt="" /></a>
                    <a href="https://web.telegram.org/"><img src="/images/telegram-logo.png" alt="" /></a>
                    <a href="https://www.whatsapp.com/"><img src="/images/whatsApp-logo.png" alt="" /></a>
                </div>
                <div className='footer-office'>
                    <p style={{paddingTop: '0.5vh'}}>Москва, ул. -, д. -</p>
                    <p style={{marginTop: '-0.5vh'}}>Рабочее время с 9:00 до 20:00</p>
                </div>

            </div>
            <div className='footer-contacts'>
                <h2 className='footer-header'>Контакты</h2>
                <a className='footer-link' href='tel:+1234567890'>+8 414 412 12 12</a>
                <a className='footer-link' href='tel:+1234567890'>+8 221 522 32 23</a>
                <a className='footer-link' href='mailto:OurCluchevik@mail.ru'>OurCluchevik@mail.ru</a>
                <a className='footer-link' href='/order'>Отправить заявку</a>
            </div>
            <div className='footer-shop'>
                <h2 className='footer-header'>Недвижимость</h2>
                <a className='footer-link' href='/order'>Строительство дома</a>
                <a className='footer-link' href='/'>Купить недвижимость</a>
                <a className='footer-link' href='/order'>Оформить смету</a>
                <a className='footer-link' href='/order'>Другое</a>
            </div>
            <div className='footer-account'>
                <h2 className='footer-header'>Личный кабинет</h2>
                <a className='footer-link' href='/account'>Перейти в личный кабинет</a>
                <a className='footer-link' href='/reg'>Регистрация акаунта</a>
            </div>
            <div className='footer-services'>
                <h2 className='footer-header'>Услуги</h2>
                <div>
                    <a className='footer-link' href='/order'>Создать план</a>
                    <a className='footer-link' href='/order'>Создать смету</a>
                    <a className='footer-link' href='/order'>Строительство</a>
                    <a className='footer-link' href='/order'>Ремонт</a>
                    <a className='footer-link' href='/'>Купить недвидимость</a>
                    <a className='footer-link' href='/order'>Строительство фундамента</a>
                    <a className='footer-link' href='/order'>Установка оборудования</a>
                    <a className='footer-link' href='/order'>Размещение ограждений</a>
                </div>
            </div>
        </footer>
    )
}