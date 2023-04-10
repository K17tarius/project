import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { db } from '../../firebase';
import "./vendorlogin.css";

function VendorLoginPage() {
  const [vendorLogin, setVendorLogin] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(vendorLogin); // Replace with logic to submit the login data to a server
    checkLogin();
  };

  useEffect(()=>{
    const q = query( collection(db, "vendors"));
    getDocs(q).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
      })
    });
  },[])


  const checkLogin = async () => {
    const q = query( collection(db, "vendors"), where("Vendor_email", "==", vendorLogin.email), where("Vendor_pass", "==", vendorLogin.password));
    const querySnapshot = await getDocs(q);
    var myItems = [];
    const cookies = new Cookies();

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data())
      cookies.set('umail', vendorLogin.email, { path: '/' });
      cookies.set('upass', vendorLogin.password, { path: '/' });
      cookies.set('uid', doc.data().Vendor_ID, { path: '/' });
      cookies.set('uloggedin', true, { path: '/' });
      cookies.set('utype', 'vendor', { path: '/' });
      cookies.set('uname', doc.data().Vendor_name, { path: '/' })

    });

    window.setTimeout(()=>{
      window.location.href = '/'
    }, 1500)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVendorLogin((prevVendorLogin) => ({ ...prevVendorLogin, [name]: value }));
  };

  return (
    <div className="container">
      <h2>Vendor Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={vendorLogin.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={vendorLogin.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default VendorLoginPage;