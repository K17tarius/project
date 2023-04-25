import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Cookies from "universal-cookie";
import "./cart.css";
import { Toast, ToastContainer } from "react-bootstrap";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51MuzrbSA5uEUTqOaw7V8Y4lyLCyAdL5t8YeGuQobsnfO8o4Utdg4g5t1sHMUTw5R8xKLaaqIqMG6oRAyjuSwTiC0006DdZ96OA');


function ShoppingCart(){

  const cookies = new Cookies();
  var [cart, setCart] = useState([]);
  var [total, setTotal] = useState(0);
  var [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  var [showPayment, setShowPayment] = useState(false);
  var [paymentOptions, setPaymentOptions] = useState({
    clientSecret : ""
  })

  function setStripe(){
    setLoading(true);
    const sk = 'sk_test_51MuzrbSA5uEUTqOaRkIeihMZaBgteIXzXpXEhAMAfsLZPfRoW0qsvaaRyqywamxnEU9TE03b5U8lzrZ8yHQIu8D000zCBh2NUt'
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Bearer " + sk);

    var urlencoded = new URLSearchParams();
    // Hardcoded to hundred for testing //
    urlencoded.append("amount", "100");
    urlencoded.append("currency", "inr");
    urlencoded.append("payment_method_types[]", "card");


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://api.stripe.com/v1/payment_intents", requestOptions)
    .then(response => response.json())
    .then(result => {
      var secret = result['client_secret']
      console.log(secret);
      setLoading(false);
      setPaymentOptions({
        clientSecret : secret
      });
      setShowPayment(true);
    })
    .catch(error => {console.log('error', error); setLoading(false); showToastMessage('Error in Stripe!')});
  }



  useEffect(()=>{
    var crt = cookies.get('cart') ? cookies.get('cart') : []
    setCart(crt)

    var ttl = 0
    for(var i = 0;i< crt.length; i++){
      ttl+= crt[i].price * crt[i].count
    }
    setTotal(ttl);

  }, [])

  function buy(){

    if(cookies.get('uid')){

      
    setStripe();
 
  }
  else{
    showToastMessage('Login to purchase!');
  }
  }

  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function removeItem(el){
    var cartItems = cookies.get('cart') ? cookies.get('cart') : []

    for(var i=0;i<cartItems.length;i++){
      if(cartItems[i].id == el.id){
        cartItems.splice(i, 1);
      }
    }

    cookies.set('cart', cartItems);
    setCart(cartItems)
  }

  return (
    <>
    <Container>
        <Row className="mt-4">
          <Col md="12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Item</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((el, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{el.name}</td>
                        <td>{el.count}</td>
                        <td> Rs {el.price}</td>
                        <td> Rs {el.price * el.count}</td>
                        <td><u onClick={()=>{removeItem(el)}}>Remove</u></td>
                      </tr>
                    </>
                  );
                })}
                <tr>
                  <td colSpan="5"><b>Sum Total</b></td>
                  <td> Rs {total}</td>
                </tr>
              </tbody>
            </Table>
            {cart.length>0 && 
            <Button
              onClick={() => {
                buy();
              }}
            >
              Buy
            </Button>
            }
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
          {loading == true && <span>Loading...</span>}
          {showPayment && <div className="paymentHolder">
            <Elements stripe={stripePromise} options={paymentOptions}>
              <CheckoutForm />
            </Elements>
          </div>}
          </Col>
        </Row>
      </Container>
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
  );
}

export default ShoppingCart;