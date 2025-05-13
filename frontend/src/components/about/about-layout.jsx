import About from "./about";
import Nav from "../nav/nav.jsx";
import Footer from "../footer/footer";

export default function AboutLayout(){
    return(
        <div>
            <Nav/>
            <main>
               <About/>
            </main>
            <Footer/>
        </div>

    )
}