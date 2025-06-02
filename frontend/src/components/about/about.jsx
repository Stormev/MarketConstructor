import './about.css'

// Гланвый компонент - Лендинг страница || примитивно как-то ==============================================
export default function About()
{
    return(
        <div className='about-body'>
            <div className='about-title'>
                <div className='about-title-top' style={{backgroundImage: "url(/images/backgroundAbout.png)"}}>
                    <h1>Ключевик</h1>
                    <h3>Мы построим вашу мечту<br/>«под ключ»</h3>
                </div>
                <div className='about-title-bottom'>
                    <div className='about-title-card'>
                        <img src="/images/icons/time.png" alt="img" />
                        <h4>Выслуга</h4>
                        <p>Больше 10 лет<br/>на рынке</p>
                    </div>
                    <div className='about-title-card'>
                        <img src="/images/icons/list.png" alt="img" />
                        <h4>Выполнено</h4>
                        <p>Больше<br/>90 проектов</p>
                    </div>
                    <div className='about-title-card'>
                        <img src="/images/icons/rate.png" alt="img" />
                        <h4>Оценка</h4>
                        <div className='about-rate'>
                            <h3>4.8</h3>
                            <img src="/images/icons/star.png" alt="" />
                        </div>
                        <div className='about-rate-add'>
                            <p>В яндекс отзывах</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='about-content'>
                <div className='about-content-title'> 
                    <h1>Наши принципы работы</h1>
                </div>
                <div className='about-content-top'>
                    <div className='about-content-small' style={{backgroundColor: "#DEFFCC"}}>
                            <img src="/images/icons/money.png" alt="img" />
                            <h4>Удержание цен</h4>
                            <p>За счет<br/>эффективной логистики, мы<br/>способны<br/>удержать старые<br/>цены на рынке</p>
                    </div>
                    <div className='about-content-big' style={{backgroundColor: "#B6E7FF"}}>
                        <div>
                            <img src="/images/icons/quality.png" alt="img" />
                            <h4>Качетсво</h4>
                        </div>
                        <p className='about-content-bi-p1'>Квалифицированные специалисты обладают<br/>глубокими знаниями современных технологий и<br/>материалов, что позволяет им применять лучшие<br/>практики и гарантировать долговечность</p>
                        <p className='about-content-bi-p2'>Они способны учитывать все ваши пожелания в<br/>проекте, начиная от планировки и заканчивая<br/>отделочными работами, что в конечном итоге<br/>сказывается на удовлетворенности клиентов</p>
                    </div>
                </div>
                <div className='about-content-bottom'>
                    <div className='about-content-small' style={{backgroundColor: "#FFEB9A"}}>
                            <img src="/images/icons/idea.png" alt="img" />
                            <h4>Технологии</h4>
                            <p>Обладаем<br/>высокоточной<br/>техникой.<br/>Товар проходит<br/>проверку от<br/>независимых<br/>организация</p>
                    </div>
                    <div className='about-content-small' style={{backgroundColor: "#FFFFFF"}}>
                            <img src="/images/icons/visible.png" alt="img"/>
                            <h4>Прозрачность</h4>
                            <p>В любой момент<br/>времени вы<br/>можете<br/>посмотреть все<br/>документы и лично<br/>присутствовать на<br/>стройке</p>
                    </div>
                    <div className='about-content-small' style={{backgroundColor: "#FFD5FB"}}>
                            <img src="/images/icons/partner.png" alt="img" />
                            <h4>Партнеры</h4>
                            <p>Мы обладаем<br/>связями с банками,<br/>поможем выбрать<br/>лучший тариф и<br/>организовать<br/>покупку участка</p>
                    </div>
                </div>
            </div>
            <div className='about-process-body'>
                <div className='about-process-titles'> 
                    <h1>Процесс выполнения</h1>
                </div>
                <div className='about-process-content'>
                    <div className='about-process-content-left'>
                        <div className='about-process-card about-process-card-start'>
                            <div className='about-process-num'>1</div>
                            <p>Организация докуметов</p>
                        </div>
                        <img src='/images/arrowDown.png' className='about-process-arrow' alt="img" />
                        <div className='about-process-card'>
                            <div className='about-process-num'>2</div>
                            <p>Создание Сметы</p>
                        </div>
                        <img src='/images/arrowDown.png' className='about-process-arrow' alt="img" />
                        <div className='about-process-card'>
                            <div className='about-process-num'>3</div>
                            <p>Согласование с заказчиком</p>
                        </div>
                        <img src='/images/arrowDown.png' className='about-process-arrow' alt="img" />
                        <div className='about-process-card'>
                            <div className='about-process-num'>4</div>
                            <p>Выполнение заказа</p>
                        </div>
                        <img src='/images/arrowDown.png' className='about-process-arrow' alt="img" />
                        <div className='about-process-card'>
                            <div className='about-process-num'>5</div>
                            <p>Проверка эспертизы</p>
                        </div>
                        <img src='/images/arrowDown.png' className='about-process-arrow' alt="img" />
                        <div className='about-process-card about-process-card-final'>
                            <div className='about-process-num'>6</div>
                            <p>Сдача проекта</p>
                        </div>
                    </div>
                    <div className='about-process-content-right'>
                        <img className='about-process-projects' src="/images/project-house.png" alt="img" />
                        <img className='about-process-projects about-process-projects2' src="/images/project-house1.png" alt="img" />
                    </div>
                </div>
            </div>
        </div>
    )
}