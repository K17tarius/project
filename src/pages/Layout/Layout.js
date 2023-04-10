import { Outlet, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LeftNav from "../../components/LeftNav/leftnav";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <Header></Header>
        <Outlet />
      
      
      <br></br>
      <Footer></Footer>
    </>
  )
};

export default Layout;