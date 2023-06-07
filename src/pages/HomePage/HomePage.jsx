import Maps from "../../components/Maps/Maps"
import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../HomePage/HomePage.css'



const HomePage = () => {
    return (
        <div>
            <Carousel className="home-page" >
                <Carousel.Item className="carousel">
                    <img
                        className="d-block w-100"
                        src="../../../carousel1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <Link to="/usuarios"><h3>Descubre a otros músicos</h3> </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel">
                    <img
                        className="d-block w-100"
                        src="../../../carousel2.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <Link to="/salas"><h3>Encuentra las mejores salas de ensayo</h3></Link>
                    </Carousel.Caption>
                </Carousel.Item >
                <Carousel.Item className="carousel">
                    <img
                        className="d-block w-100"
                        src="../../../carousel3.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <Link to="/eventos-abiertos"><h3>Desata tu creatividad</h3></Link>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel >
        </div >



    )
}

export default HomePage
