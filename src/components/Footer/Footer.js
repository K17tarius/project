import "./Footer.css";
import { Outlet, Link } from "react-router-dom";

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <Container>
        <Row>
          <Col md={4} className="mt-4">
            <h5>Contact Us</h5>
            <p><FaPhone className="me-2" />123-456-7890</p>
            <p><FaEnvelope className="me-2" />ayushmannenterprises@gmail.com</p>
          </Col>
          <Col md={4} className="mt-4">
            <h5>Follow Us</h5>
            <p><a href="https://www.facebook.com"><FaFacebook className="me-2" />Facebook</a></p>
            <p><a href="https://www.instagram.com"><FaInstagram className="me-2" />Instagram</a></p>
            <p><a href="https://www.twitter.com"><FaTwitter className="me-2" />Twitter</a></p>
          </Col>
          <Col md={4} className="mt-4">
            <h5>About Us</h5>
            <p>We deal in various construction related tasks such as buying and selling of goods like doors,windows and railings of different kind of materials such as pvc, upvc, wooden and aluminium.</p>
          </Col>
        </Row>
        <hr />
        <div className="text-center py-3">
          &copy; {new Date().getFullYear()} Ayushmann Enterprises
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
