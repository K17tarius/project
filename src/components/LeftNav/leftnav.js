import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faUser, faHeart, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const LeftNav = () => {
  const categories = [
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'Shoes' },
    { id: 3, name: 'Accessories' },
    { id: 4, name: 'Beauty' },
    { id: 5, name: 'Home' },
    { id: 6, name: 'Sale' },
  ];

  return (
          <Nav defaultActiveKey="/" className="flex-column pt-3">
            <Nav.Item>
              <Nav.Link href="/" className="text-dark"><FontAwesomeIcon icon={faHome} className="mr-2" />Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/cart" className="text-dark"><FontAwesomeIcon icon={faShoppingCart} className="mr-2" />Cart</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/account" className="text-dark"><FontAwesomeIcon icon={faUser} className="mr-2" />My Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/wishlist" className="text-dark"><FontAwesomeIcon icon={faHeart} className="mr-2" />Wishlist</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/orders" className="text-dark"><FontAwesomeIcon icon={faBoxOpen} className="mr-2" />Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/categories" className="text-dark font-weight-bold mt-4">Categories</Nav.Link>
            </Nav.Item>
            {categories.map(category => (
              <Nav.Item key={category.id}>
                <Nav.Link href={`/categories/${category.id}`} className="text-muted">{category.name}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
  );
}

export default LeftNav;