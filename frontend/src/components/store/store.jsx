import CalcMortgage from "../calcMortgage/mortgage"
import StoreFilter from "../storeFilter/storeFilter"
import StoreCard from "../storeCard/storeCard"
import "./store.css"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useInView } from 'react-intersection-observer';

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

const PAGE_SIZE = 10

export default function Store(){

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0.5,
    });
    const isFetching = useRef(false);

    const [menuActive, setMenuActive] = useState(false)

    useEffect(() => {
        const load = async () => {
            if (isFetching.current || !hasMore) return;

             isFetching.current = true

            try {
                const response = await axios.get(`${api_url}:${api_port}/api/store/products`, {
                    params: {
                        page,
                        limit: PAGE_SIZE,
                    },
                });

                if (response.data.length > 0) {
                    setProducts((prev) => [...prev, ...response.data]);
                }

                if (response.data.length < PAGE_SIZE) {
                    setHasMore(false);
                }
                console.log('Загрузка page:', page, 'получено:', response.data);
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            } finally {
                isFetching.current = false
            }
        };
        load();

    }, [page, hasMore]);

    useEffect(() => {
        if (inView && hasMore) {
        setPage(prev => prev + 1);
        }
  }, [inView, page, hasMore]);

    return(
        <div className="store-body">
            <div className={`store-left ${menuActive ? "active" : ""}`}>
                <StoreFilter/>
                <CalcMortgage/>
            </div>
            <div className="store-right">
                {products.map(p => (
                    <StoreCard key={p.product_id} title={p.title} cost={p.cost} mortgage={p.mortgage} precost={p.precost} itemlink={p.product_id} images={p.images} location={p.address} material={p.material} year={p.year} comfort={p.tier} count_rooms={p.room_count} size={p.size} facing={p.facing} service={p.service}/>
                ))}
                <div ref={ref} style={{ height: '1px' }} />
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