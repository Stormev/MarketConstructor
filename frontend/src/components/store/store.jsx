import CalcMortgage from "../calcMortgage/mortgage"
import StoreFilter from "../storeFilter/storeFilter"
import StoreCard from "../storeCard/storeCard"
import "./store.css"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useInView } from 'react-intersection-observer';

const api_url = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

// Макс страниц для пагинации ==============================================
const PAGE_SIZE = 5

// Компонент для layout ==============================================
export default function Store(){

    // товар ==============================================
    const [products, setProducts] = useState([]);

    // Страница ==============================================
    const [page, setPage] = useState(1);

    // указатель на то что есть еще контент или нет? ==============================================
    const [hasMore, setHasMore] = useState(true);

    // Фильтры пользователя ==============================================
    const [filter , set_filter] = useState({})

    // Для бесконечного скролинга триггер ==============================================
    const { ref, inView } = useInView({
        threshold: 1.0,
    });

    // Статус загрузки ==============================================
    const isFetching = useRef(false);

    // Меню мобильное ==============================================
    const [menuActive, setMenuActive] = useState(false)

    // Ручка установки фильтра ==============================================
    const handleFilterSubmit = (filterData) => {
        console.log('Получены фильтры:', filterData);
        set_filter(filterData)
        setPage(1)
        setProducts([])
        setHasMore(true)
    };

    // Получение товара ==============================================
    useEffect(() => {
        const load = async () => {
            if (isFetching.current || !hasMore) return;

             isFetching.current = true

            try {
                var response = {};
                
                // Проверка на наличие фильтра ==============================================
                if (Object.keys(filter).length > 0) {
                    response = await axios.get(`${api_url}:${api_port}/api/store/products`, {
                        params: {
                            page,
                            limit: PAGE_SIZE,
                            maxcost: filter.max_cost,
                            checks: filter.check,
                            select: filter.select
                        },
                    });
                }
                else {
                    response = await axios.get(`${api_url}:${api_port}/api/store/products`, {
                        params: {
                            page,
                            limit: PAGE_SIZE,
                        },
                    });
                }

                if (response.data.length > 0) {
                    setProducts((prev) => [...prev, ...response.data]);
                }

                // Установка лимита если товар кончился ==============================================
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

    }, [page, hasMore, filter]);

    // Ручка дозагрузки контента (меняет page) ==============================================
    useEffect(() => {
        if (inView && hasMore && !isFetching.current) {
        setPage(prev => prev + 1);
        }
  }, [inView, page, hasMore]);

    // Форма ==============================================
    return(
        <div className="store-body">
            <div className={`store-left ${menuActive ? "active" : ""}`}>
                <StoreFilter onSubmit={handleFilterSubmit}/>
                <CalcMortgage/>
            </div>
            <div className="store-right">
                {products.map(p => (
                    <StoreCard key={p.product_id} title={p.title} cost={p.cost} mortgage={p.mortgage} precost={p.precost} itemlink={p.product_id} images={p.images[0] ? p.images[0]['image'] : 0} location={p.address} material={p.material} year={p.year} comfort={p.tier} count_rooms={p.room_count} size={p.size} facing={p.facing} service={p.service}/>
                ))}
                <div ref={ref} style={{ height: '10px',width:"80%"}} />
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