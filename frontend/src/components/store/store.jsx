import CalcMortgage from "../calcMortgage/mortgage"
import StoreFilter from "../storeFilter/storeFilter"
import StoreCard from "../storeCard/storeCard"
import "./store.css"
import { useState } from "react"

export default function Store(){
    const [menuActive, setMenuActive] = useState(false)
    return(
        <div className="store-body">
            <div className={`store-left ${menuActive ? "active" : ""}`}>
                <StoreFilter/>
                <CalcMortgage/>
            </div>
            <div className="store-right">
                <StoreCard housetype="Частный дом"/>
                <StoreCard housetype="Частный дом"/>
                <StoreCard housetype="Частный дом"/>
                <StoreCard housetype="Частный дом"/>
            </div>
            <div className={`store-menu-body ${menuActive ? "active" : ""}`} onClick={()=>{setMenuActive(!menuActive)}}>
                    <div className={`store-menu ${menuActive ? "active" : ""}`} id='store-button-id'>
                        <img src="/images/icons/filter.png" alt="" />
                    </div>
                    <label htmlFor='store-button-id'>Поиск</label>
                </div>
        </div>
    )
}