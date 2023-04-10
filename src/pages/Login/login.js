import React, { useState, setState } from "react";
import "./login.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Cookies from 'universal-cookie';

function LoginForm() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  const handleSubmit = () => {
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        if (user.emailVerified) {
          showToastMessage('Logged in successfully!');
          const cookies = new Cookies();
          cookies.set('umail', email, { path: '/' });
          cookies.set('upass', password, { path: '/' });
          cookies.set('uid', user.uid, { path: '/' });
          cookies.set('uloggedin', true, { path: '/' });
          cookies.set('utype', 'customer', { path: '/' });
          cookies.set('uname', user.displayName, { path: '/' })
          window.setTimeout(()=>{
            window.location.href = '/'
          },1500)

        } else {
          showToastMessage('Verify email to log in!');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        showToastMessage(errorMessage);
      });
  };

  return (
    <div className="form">
      <div className="form-body">
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
      </div>
      <div class="loginbtn">
        <button onClick={() => handleSubmit()} type="submit" class="btn">
          Login
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

export default LoginForm;
