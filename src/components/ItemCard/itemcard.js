import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./itemcard.css";
import { Toast, ToastContainer } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Cookies from "universal-cookie";

function ItemCard(props) {
  let [num, setNum] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");



  const buyProduct = async () => {
    if(props.cardData.stock - num < 0){
      showToastMessage('Quantity more than stock, cannot buy!');
    }
    else{
      const itemRef = doc(db, "items", props.cardData.id);
      await updateDoc(itemRef, {
        itemQuantity: (props.cardData.stock - num)
      });
      showToastMessage('Bought ' + num + ' items!');
    }
  }

  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function addToCart(){

    if(num <=0){
      showToastMessage('Add products!');
      return
    }


    const cookies = new Cookies();
    
    var count = num;
    var cartItems = cookies.get('cart') ? cookies.get('cart') : []

    for(var i=0;i<cartItems.length;i++){
      if(cartItems[i].id == props.cardData.id){
        count += cartItems[i].count;
        cartItems.splice(i, 1);
      }
    }

    if(props.cardData.stock - count < 0){
      showToastMessage('Quantity more than stock, cannot buy!');
    }
    else{
      cartItems.push({
        'id' : props.cardData.id,
        'count' : count,
        'name' : props.cardData.name,
        'price' : props.cardData.price
      })
      cookies.set('cart', cartItems);
      showToastMessage('Added ' + props.cardData.name + " to cart!");
      setNum(0);
    }
  }
  
  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <>
      <Col md="2">
        <div className={"itemCard"}>
          <div
            className="itemCardImageBox"
            style={{ backgroundImage: "url(" + props.cardData.image + ")" }}
          ></div>
          <div className="itemCardTitle">{props.cardData.name}</div>
          <div className="itemCardPrice">Rs {props.cardData.price}</div>
          <div className={"holder"}>
            <button onClick={decNum}>-</button>
            <input type="text" value={num} onChange={handleChange} />
            <button onClick={incNum}>+</button>
          </div>
          <Button
            variant="light"
            type="button"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={()=>{addToCart()}}
          >
            Add to Cart
          </Button>
          {/* <Button
            variant="light"
            type="button"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={()=>{buyProduct()}}
          >
            Buy
          </Button> */}
        </div>
      </Col>

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

export default ItemCard;
