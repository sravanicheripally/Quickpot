import React from "react";
import '../components/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import carg from '../components/Images/carg11.png'
import carga from '../components/Images/oip2.jpg'
import cargb from '../components/Images/carg.png'
import { Carousel } from "react-bootstrap";
import { useSelector } from 'react-redux';
function Home() {
    const value=useSelector((state)=>state.display.Deliveryrole)
    // console.log(value,"iam payment options")
    return (
     
        <div className='container'>
            <h3>  <span>Welcome To</span>
                <span style={{ color: 'red' }}> Quick</span>
                <span style={{ color: 'aqua' }} >Port</span>
                <span style={{ color: 'red' }}>365</span>
            </h3>
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block"
                        src={carg}
                        alt="Second slide" width="100%" height="580"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block"
                        src={cargb}
                        alt="Third slide" width="100%" height="580"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block"
                        src={carga}
                        alt="First slide" width="100%" height="580"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            {/* <h6>{value}</h6> */}
        </div>
    )
}
export default Home