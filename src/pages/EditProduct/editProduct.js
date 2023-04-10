import { useEffect, useState } from "react";
import "./editProduct.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { limitChecker } from '../../commonservice';

function EditProduct() {
  const queryParameters = new URLSearchParams(window.location.search);
  const itemId = queryParameters.get("id");
  const currentVendorId = "123";


  const [itemName, setItemName] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [itemStock, setItemStock] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    console.log("Page open");
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try{
      const docRef = doc(db, "items", itemId);
      const docSnap = await getDoc(docRef);
      var data = docSnap.data();
      setItemName(data.itemName)
      setItemImage(data.itemImage)
      setItemPrice(data.itemPrice)
      setItemStock(data.itemQuantity)
      if(!data){
        throw("Item not found!!")
      }
    }
    catch(err){
      showToastMessage('Error! ' + err);
    }
    
  };

  function handleSubmit(){
      limitChecker('edit', itemId, currentVendorId, itemStock, itemPrice).then((limitCheckerVal) => {
        
        if( limitCheckerVal != 'Success'){
          showToastMessage(limitCheckerVal);
        }
        else{
          const itemRef = doc(db, "items", itemId);
          updateDoc(itemRef, {
            itemImage : itemImage,
            itemName : itemName,
            itemPrice : itemPrice,
            itemQuantity : itemStock,
            itemAddedOn : new Date(),
          }).then((data)=>{
            showToastMessage('Updated product successfully!');
          })
        }
      })
  };

  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <>
      <div className="form">
        <div className="form-body">
          <h4>Edit Item</h4>

          <div className="username">
            <label className="form__label" for="firstName">
              Item Name{" "}
            </label>
            <input
              className="form__input"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              id="firstName"
              placeholder="Item Name"
            />
          </div>
          <div className="lastname">
            <label className="form__label" for="lastName">
              Item Image{" "}
            </label>
            <input
              type="text"
              name=""
              id="lastName"
              value={itemImage}
              className="form__input"
              onChange={(e) => setItemImage(e.target.value)}
              placeholder="Image URL"
            />
          </div>
          <div className="email">
            <label className="form__label" for="email">
              Item Price{" "}
            </label>
            <input
              type="number"
              id="email"
              className="form__input"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">
              Item Stock{" "}
            </label>
            <input
              className="form__input"
              type="number"
              id="confirmPassword"
              value={itemStock}
              onChange={(e) => setItemStock(e.target.value)}
              placeholder="Item Quantity"
            />
          </div>
        </div>
        <div className="submitbtn">
          <button onClick={() => handleSubmit()} type="submit" className="btn">
            Update
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
    </>
  );
}

export default EditProduct;
