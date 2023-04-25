import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Toast, ToastContainer } from "react-bootstrap";
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }



  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      showToastMessage(result.error.message)
      console.log(result.error.message);

    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
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
        </>
  )
};

export default CheckoutForm;