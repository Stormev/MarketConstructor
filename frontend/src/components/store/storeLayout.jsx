import Footer from "../footer/footer";
import Nav from "../nav/nav";
import Store from "./store";

export default function StoreLayout(){
    return(
        <div>
            <Nav/>
            <Store/>
            <Footer/>
        </div>
    )
}