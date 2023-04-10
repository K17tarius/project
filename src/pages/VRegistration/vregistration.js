import React, { useState } from 'react';
import './vregistration.css';

function VendorRegistrationPage() {
  const [vendorInfo, setVendorInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(vendorInfo); // Replace with logic to submit the form data to a server
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVendorInfo((prevVendorInfo) => ({ ...prevVendorInfo, [name]: value }));
  };

  return (
    <div className="container">
      <h2>Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={vendorInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={vendorInfo.email}
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
            value={vendorInfo.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={vendorInfo.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={vendorInfo.company}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={vendorInfo.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            rows="3"
            value={vendorInfo.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default VendorRegistrationPage;