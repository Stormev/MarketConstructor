import "./payment.css"

const PaymentCard = ({tooltip="Способ оплаты", image="/images/icons/aspect.png", onClick=({})}) => {
    return(
        <button className="payment-methods-card" onClick={onClick} style={{backgroundImage: `url(${image})`}}>
            <div className="payment-methods-card-tooltip"><p>{tooltip}</p></div>
        </button>
    )
}

const tips = ["После пред. оплаты, в течение 6 месяцев никто не сможет приобрести эту квартиру, кроме вас.", "Пред. Оплата гарантирует что только вы можете претендовать на товар в течение промежутка времени"]

export default function Payment({title="Нет данных", operation_type="Нет данных", cost=0}){
    return(
        <div className="payment-body" style={{backgroundImage: "url(/images/welcome-background.png)"}}>
            <div className="payment-inf">
                <div className="payment-inf-data">
                    <div className="payment-inf-data-item">
                        <img src="/images/icons/stack.png" alt="icon" />
                        <h2>Ваш товар / Услуга</h2>
                    </div>
                    <h2>{title}</h2>
                    <div className="payment-inf-data-values">
                        <h3>Операция: {operation_type}</h3>
                        <div className="payment-inf-data-item-cost">
                            <img src="/images/icons/money2.png" alt="icon" />
                            <h3>Стоимость: {cost} ₽</h3>
                        </div>
                    </div>
                </div>
                <div className="payment-inf-tip">
                    <div className="payment-inf-tip-item">
                            <img src="/images/icons/tip.png" alt="icon" />
                            <h2>Преймущества</h2>
                    </div>
                    <p>{tips[Math.floor(Math.random() * tips.length)]}</p>
                </div>
            </div>
            <div className="payment-methods">
                <div className="payment-methods-title">
                    <img src="/images/icons/cart.png" alt="icon" />
                    <h1>Выберите способ оплаты</h1>
                    <span/>
                </div>
                <div className="payment-methods-content">
                    <PaymentCard tooltip="ВТБ Банк" image="/images/icons/payment/vtb.png"/>
                </div>
            </div>
        </div>
    )
}