import React, { useState, setState } from "react";
import { database } from "../../firebase";
import { ref, push, child, update } from "firebase/database";
import "./Registration.css";
import { Toast, ToastContainer } from "react-bootstrap";
import {  createUserWithEmailAndPassword, updateProfile, sendEmailVerification   } from 'firebase/auth';
import { auth } from '../../firebase';

function RegistrationForm() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function updateFirestore(data){
    updateProfile(auth.currentUser, data).then(() => {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        showToastMessage('Verification email sent!');
      });

    }).catch((error) => {
      showToastMessage(error);
    });


 

  }

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, confirmPassword);
    let obj = {
      displayName: firstName + " " + lastName,
    };

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        updateFirestore(obj);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        showToastMessage(errorMessage);
    });
    setTimeout(() => {
      document.location.reload();
    }, 5000);
    
    // const newPostKey = push(child(ref(database), "posts")).key;
    // const updates = {};
    // updates["/" + newPostKey] = obj;
    // update(ref(database), updates)
    //   .then(() => {
    //     showToastMessage("Registered Successfully!");
    //   })
    //   .catch(() => {
    //     showToastMessage("Error!");
    //   });
  };


  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="firstName">
            First Name{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="lastname">
          <label className="form__label" for="lastName">
            Last Name{" "}
          </label>
          <input
            type="text"
            name=""
            id="lastName"
            value={lastName}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="LastName"
          />
        </div>
        <div className="email">
          <label className="form__label" for="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className="form__label" for="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className="form__label" for="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div class="submitbtn">
        <button onClick={() => handleSubmit()} type="submit" class="btn">
          Register
        </button>
      </div>
      <ToastContainer className="p-3" position={"bottom-center"}>
        <Toast
          show={showToast}
          onClose={() => {
            setShowToast(false);
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              onClick={() => {
                setShowToast(false);
              }}
            />
            <strong className="me-auto">Message</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default RegistrationForm;
