import './card.css'
import React from 'react';
import { useNavigate } from 'react-router-dom'

// компонент карточка для услуг ==============================================
export default function CardService({title='Name', cost='*', time='*', endtime='', image='/images/cards/projectBlue.png'}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/order');
      }

    return(
        <section className='services-card' id='card' onClick={handleClick}>
            <h3>{title}</h3>
            <div className='services-card-layout'>

            <div className='services-card-about'>
                <div className='services-card-info'>
                    <img src="/images/icons/cost.png" alt="#cost" />
                    <p>От {cost} ₽</p>
                </div>
                <div className='services-card-info'>
                    <img src="/images/icons/calendar.png" alt="#time" />
                    {endtime==='' ? <p>От {time}</p> : <p>От {time}<br/>До {endtime}</p>}
                    
                </div>
            </div>

            <div className='services-card-image'>
                <img src={image} alt="#Image" />
            </div>

            </div>
    </section>
    )
}