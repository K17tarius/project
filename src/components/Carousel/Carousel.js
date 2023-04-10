import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";

function CarouselComponent() {
  return (
    <div className="carouselHolder">
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/c1.webp"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/c2.webp"
            alt="Second slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/c3.webp"
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
