import "./itemDescription.css"
import Nav from "../nav/nav"
import ItemDescription from "./itemDescription"
import Footer from "../footer/footer"
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import { useState, useEffect } from "react"

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

export default function ItemDescriptionLayout(){
    const navigate = useNavigate()
    const [product, set_product] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        const GetProduct = () => {
            axios.get(`${api_url}:${api_port}/api/store/product/${id}`).then(
                response => {
                    const data = response.data
                    console.log(data)
                    if (Object.keys(data).length > 0) {
                        set_product(<ItemDescription title={data.title} cost={data.cost} address={data.location} images={data.images} year={data.year} material={data.material} mortgage={data.mortgage} comfort={data.tier} rooms={data.room_count} services={data.service} size={data.size} facing={data.facing} description={data.description}/>) 
                    }
                }).catch(err=> {
                    console.error(err)
                    navigate("/")
                })
        return <div>None</div>
        }
    GetProduct()
    setTimeout(()=>{
    }, 60000)
  }, []);

    return(
        <div>
            <Nav/>
            {product}
            <Footer/>
        </div>
    )
}