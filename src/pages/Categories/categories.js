import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./categories.css";

function CategoriesPage() {
  const categories = [
    { id: 1, name: 'Aluminium Doors', image: 'https://dq3atogbtxhm1.cloudfront.net/Images/Medium/20220722043550-dd781f88-3b3e-47d1-ad6c-eebc55b6b0f9.jpg' },
    { id: 2, name: 'Aluminium Windows', image: 'https://cpimg.tistatic.com/05861441/b/4/Aluminium-Window.jpg' },
    { id: 3, name: 'Aluminium Railing', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw83c8P3JeQpozKuBU5nOQ7SweZyMDBH6urQ&usqp=CAU' },
    { id: 4, name: 'Wooden Doors', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj4L6keP4bGlrKHjZ_5Y78N-Q2fKA2tJlOmw&usqp=CAU' },
    { id: 5, name: 'PVC Doors', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIEAgQMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAABwIDAQQGBf/EAEQQAAIBAgMCBgwLCQEAAAAAAAABAgMRBAUhBjESIkFRYbIHEzJkcXOBoaKxwtEXIzM0UnJ0kZOzwTVCU2JjhJLi8BT/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAwQBAv/EAB4RAQACAgIDAQAAAAAAAAAAAAABAwIxEUESEyFR/9oADAMBAAIRAxEAPwC4AAAAAPm7RY+rlmS4rG0IwlUpRTip3s9Uv1PBx7I2aX42Fwem9Wl7z2e2ivstmPir+dEbcYzpVHJtWlHWO/cyNmU4yrXjEx9e3+EPH2+ZYTyTkZR7ImM/ey/DvwVGjwUW9bSl95zCLb1nN252T9mSnrxe/wDhFxN9cto/jP3Ga7I1TS+VQf8Adf6ng7PkbObN34zHsyPXj+Pfw7IsnOMZZSkpNK6xN/YPdx1VyE4BOfaXLVuev+RdlorFa8pnaVmMRpyACqYAAAAAAAAAAPkbXrhbL5ou9pvzEYelCqumD8zLTtUuFszmq70qv0WReXyNddMPUZ7ttFOmmn3LNlNWflMKfKjZB/GWIrcNlmbIrS1jgzSDjnLVftPjPaLmQ7K18h472i4mintC7oABZEAAAAAAAAAAHzdplfZzNVz4Ot1GRay7RiHy3j62W3PlwsjzCNt+Fqr0WRS16NX6sDPdtop7daCd/wDug2QVpoU46N9JlFcfy2INDZyo2wRjwbteE3Qjow4ZTHjYbx/tlvIrkkbzwa58QuuWo0U6lnv3AAC6AAAAAAAAAAAOpm8eFlWMit7oTXosiUI2o1fqRfnRcsar4OuuenL1EPjpSrL+nD1xIWr09tNPSLM6XdPwmENzM6W/ykWh2EbYbmalvN9NDgZ5Cr1cF9pXXZZyNZB8tgftUeuyyl6tSz3bgABZAAAAAAAAAAAGvEK+HqL+R+oiNKm5066ja/aeF9zT9SLhUV6clzpkQwdbtUqs+CpWpdy3o+NYlZC1XbqwtqjKK+NM6uIjWtwaUKdvo8u7eYx7tEZhohvN0XvNJtidG/Z35xlq76j+YWUjWzavi8tXfMfzCylq9M924AAURAAAAAAAAAABw1dEKiuC6y56T6xdiFTVq9dcipz6xOxant1qdtbmcHxtd9zTDlM4PjX6STQ7d9UbIvfY0X1NlNhx3dlnfG5YuV4iL9MspGNlPn+V/aI9cs5WvSF24AAURAAAAAAAAAAAIXieLjsXH6Lqr7my6EMzGyzfHRta1SuvPI8ZwpXP18+D1ZlGTVRLpNceXwMzuuGvCT4X5dpS11Nqa1Os3qboPexwcu7slf8A9+UrnrRfpFpItse75llHjY9YtJTBGyfoAD2kAAAAAAAAAAAQzOOJnmOlH+PWTTvyya/UubVzhJcyOTDsTwgcaDlqqN/ApP8AQ7FPCVpvi4KpJ9EZl1BzxevOUQWX4qTssBV8lKr7jdHLMff9mYn8Cr7i0geJ5yk+zWS4/D5zlzeBxMKMKqblKlJKK6WysAHYjh5meQAHXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=' },
    { id: 6, name: 'UPVC Doors', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZhJGirmOcFysix26wAWtuEVICfGHxdTVglw&usqp=CAU' }
  ];

  return (
    <div className="py-5">
      <Container>
        <h1 className="mb-4">Categories</h1>
        <Row>
          {categories.map((category) => (
            <Col key={category.id} md={4} className="mb-4">
              <a href={`/category/${category.id}`}>
                <div className="card">
                  <img src={category.image} alt={category.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                  </div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CategoriesPage;