import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Cookies from "universal-cookie";
import "./cart.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function ShoppingCart(){

  const cookies = new Cookies();
  var [cart, setCart] = useState([]);
  var [total, setTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


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

    var itemIds = [];
    var count = {}
    for(var i=0;i<cart.length;i++){
      itemIds.push(cart[i].id)
      count[cart[i].id] = cart[i].count
    }

    console.log(itemIds)
    console.log(count)


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
      setCart([])
      setTotal(0);
      cookies.set('cart', []);
      window.setTimeout(()=>{
        window.location.href = '/orders';
      },2500)
    })
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