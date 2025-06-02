import Footer from '../footer/footer'
import Nav from '../nav/nav'
import Services from './services'
import './services.css'

// Главный компонент ==============================================
export default function ServicesLayout(){
    return(
        <div>
            <Nav/>
            <Services/>
            <Footer/>
        </div>
    )
}
