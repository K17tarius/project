import "./Header.css";
import { Outlet, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Header() {

  var [userName, setUserName] = useState(null);
  var [isVendor, setIsVendor] = useState(false);
  const cookies = new Cookies();

  useEffect(()=>{
    if(cookies.get('uname')){
      setUserName(cookies.get('uname').split(' ')[0])
    }
    if(cookies.get('utype') == 'vendor'){
      setIsVendor(true);
    }
  }, [])

  function logout(){
    cookies.remove('umail');
    cookies.remove('uid');
    cookies.remove('upass');
    cookies.remove('uloggedin');
    cookies.remove('utype');
    cookies.remove('uname');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src="/images/B.png" className="logo"></img>Ayushmann Enterprises
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/analytics">About Us</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            { !userName &&
            <NavDropdown title="My Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/registration">Register</NavDropdown.Item>
              {/* <NavDropdown.Item href="/vregistration">Vendor Registration</NavDropdown.Item> */}
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/vendorlogin">Vendor Login</NavDropdown.Item>
            </NavDropdown>
            }
             { userName &&
            <NavDropdown title={userName} id="basic-nav-dropdown">
              {isVendor && 
                <NavDropdown.Item href="/vendorlisting">Vendor Listing</NavDropdown.Item>
              }
              <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={()=>{logout()}}>Logout</NavDropdown.Item>
            </NavDropdown>
            }
            <div className="searchbarHolder">
              <input placeholder="Search" className="searchbar"></input>
              <div className="searchbarBtn">
                <i className="fa fa-search"></i>
              </div>
            </div>
            <Nav.Link href="cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
