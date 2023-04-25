import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Cookies from "universal-cookie";
import { Toast, ToastContainer } from "react-bootstrap";
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cookies = new Cookies();
  const cart = cookies.get('cart') ? cookies.get('cart') : []
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function removeFromDB(){
    var itemIds = [];
    var count = {}
    for(var i=0;i<cart.length;i++){
      itemIds.push(cart[i].id)
      count[cart[i].id] = cart[i].count
    }
    getDocs(collection(db, "items")).then((data)=>{
      data.forEach((docItem) => {
        if(itemIds.includes(docItem.id)){
          var updatedCount = parseInt(docItem.data().itemQuantity) - count[docItem.id];
          console.log(updatedCount)
          updateDoc(doc(db, "items", docItem.id), {"itemQuantity" : updatedCount.toString()}).then((data)=>{
            console.log(data);
          })
        }
      });
    });

    const cookies = new Cookies();
    const docRef = addDoc(collection(db, "orders"), {
        addedBy : cookies.get('uid'),
        itemAddedOn : new Date(),
        items : cart

    }).then((data)=>{

      console.log(data)
      showToastMessage('Bought product successfully!');
      cookies.set('cart', []);
      window.setTimeout(()=>{
        window.location.href = '/orders';
      },2500)
    })
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
        return_url: "http://localhost:3000",
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      showToastMessage(result.error.message)
      console.log(result.error.message);

    } else {
    showToastMessage('Payment Complete!');
      removeFromDB();
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