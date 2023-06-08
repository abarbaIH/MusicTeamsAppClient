import { useState } from 'react'

const UsersCarousel = (props) => {

    const { images } = props;

    const [clicked, setClicked] = useState(0)

    const left = () => {
        setClicked((clicked + 1) % images.length)
    }
    const rigth = () => {
        setClicked((clicked - 1 + images.length) % images.length)
    }

    return (
        <div>
            <button onClick={left}>Left</button>
            <img src={images[clicked]} />
            <button onClick={rigth}>Rigth</button>
        </div>
    )
}

{/* <Carousel
    images={[
        'https://randomuser.me/api/portraits/women/1.jpg',
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/women/2.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg'
    ]}
/> */}
export default UsersCarousel;