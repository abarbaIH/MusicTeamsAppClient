import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../HomePage/HomePage.css'
import carrousel1 from './../../assets/carousel1.jpg'
import carrousel2 from './../../assets/carousel2.jpg'
import carrousel3 from './../../assets/carousel3.jpg'

const HomePage = () => {
    return (
        <div>
            <Carousel className="home-page" >
                <Carousel.Item className="carousel">
                    <img
                        className="d-block w-100"
<<<<<<< HEAD
                        src="../../../carousel1.jpg"
=======
                        src={carrousel1}
>>>>>>> d0989644accdf8c9d90a47a63e6b3afd8e0ca111
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <Link to="/usuarios"><h3>Descubre a otros músicos</h3> </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel">
                    <img
                        className="d-block w-100"
<<<<<<< HEAD
                        src="../../../carousel2.jpg"
=======
                        src={carrousel2}
>>>>>>> d0989644accdf8c9d90a47a63e6b3afd8e0ca111
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <Link to="/salas"><h3>Encuentra las mejores salas de ensayo</h3></Link>
                    </Carousel.Caption>
                </Carousel.Item >
                <Carousel.Item className="carousel">
                    <img
                        className="d-block w-100"
<<<<<<< HEAD
                        src="../../../carousel3.jpg"
=======
                        src={carrousel3}
>>>>>>> d0989644accdf8c9d90a47a63e6b3afd8e0ca111
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
