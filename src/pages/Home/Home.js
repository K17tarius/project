import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarouselComponent from "../../components/Carousel/Carousel";
import { useEffect } from "react";

function Home() {

  useEffect(()=>{
    console.log('Hello');
    
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({
       'email' : 'abcd',
       'password' : 'asd'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
       .then((data) => {  
          console.log(data);
          // Handle data
       })
       .catch((err) => {
          console.log(err.message);
       });

  }, [])


  return (
    <Container>
      <Row className="mt-4">
        <Col md="5">
          <div className="bannerDiv">
            <div>
              <div className="bannerDivMainText">
                Clearance Sale! Get upto 50% off
              </div>
              <div className="bannerDivSubText">
                We have lowered our prices.
              </div>
              <div className="bannerDivButton">Shop Now</div>
            </div>
          </div>
        </Col>
        <Col md="7">
          <CarouselComponent></CarouselComponent>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
