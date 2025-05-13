import "./mortgage.css"
import Slider from "../slider/slider"
import InputFieldSmall from "../input-field-small/input"
import { useEffect, useState } from 'react';

function calculateMortgage(P, annualRate, years, investment=0) {
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const A = (P - investment) * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return A.toFixed(2); 
}

function calculateResult(P, annualRate, years, investment=0) {
    const perMoth = calculateMortgage(P, annualRate, years, investment)
    return perMoth * (years * 12)
}

function requiredIncome(P, annualRate, years, maxShare = 0.4, investment=0) {

    const income = +calculateMortgage(P, annualRate, years, investment) / maxShare;
    return income.toFixed(2);
}

export default function CalcMortgage({product=false}){
    const [cost, setCost] = useState(100000)
    const [deposit, setDeposit] = useState(0)
    const [procent, setProcent] = useState(15)
    const [time, setTime] = useState(10)

    useEffect(() => {
        if (+deposit > +cost) {setDeposit(+cost)}
    }, [cost, deposit])

    return(
        <div className={`calcMortgage-body ${product ? "calcMortgage-horizontal calcMortgage-product" : ""}`}>
            <div className="calcMortgage">
                <h4>Калькулятор ипотеки</h4>
                <div className="calcMortgage-sliders">
                    <div className="calcMortgage-sliders-block">
                        {cost<1000000 ? <h4>{Intl.NumberFormat("ru-RU").format(cost)} тыс. ₽</h4> 
                        : <h4>{Intl.NumberFormat("ru-RU").format(cost)} млн. ₽</h4>} 
                        <div>
                            <p>Цена</p>
                            <Slider id="calcMortgageCost" min="100000" max="30000000" defaultValue="0" onChange={(n) => setCost(+n.target.value)}/>
                        </div>
                    </div>
                    <div className="calcMortgage-sliders-block">
                        {deposit<1000000 ? <h4>{Intl.NumberFormat("ru-RU").format(deposit)} тыс. ₽</h4> 
                        : <h4>{Intl.NumberFormat("ru-RU").format(deposit)} млн. ₽</h4>} 
                        <div>
                            <p>Взнос</p>
                            <Slider id="calcMortgageInvest" min="0" defaultValue="0" max={cost} onChange={(n) => setDeposit(+n.target.value)}/>
                        </div>
                    </div>

                </div>

                <div className="calcMortgage-values">
                    <InputFieldSmall id="calcMortgageProcent" text="Ставка %" type="number" min='0' max='3' value={15} onChange={(n) => setProcent(+n.target.value)}/>
                    <InputFieldSmall id="calcMortgageTime" text="Срок в годах" type="number" value={10} onChange={(n) => setTime(Number(n.target.value))}/>
                </div>

                <div className="calcMortgage-result">
                    <span></span>
                    <p id="calcMortgageResultCost">Итоговая стоимость:<br/> <span>{Intl.NumberFormat("ru-RU").format(calculateResult(cost, procent, time, deposit))}</span> ₽</p>
                    <p id="calcMortgageResultPayment">Ежемесячный платеж:<br/> <span>{Intl.NumberFormat("ru-RU").format(calculateMortgage(cost, procent, time, deposit))}</span> ₽</p>
                    <p id="calcMortgageResultRequire">Необходимый доход:<br/> <span>{Intl.NumberFormat("ru-RU").format(requiredIncome(cost, procent, time, 0.4, deposit))}</span> ₽</p>
                </div>
            </div>
        </div>
    )
}