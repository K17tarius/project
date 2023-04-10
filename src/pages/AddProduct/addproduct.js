import { useState } from "react";
import "./addproduct.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { limitChecker } from "../../commonservice";
import Cookies from "universal-cookie";

function AddProduct() {
  const cookies = new Cookies();

  const currentVendorId = cookies.get("uid");

  const [itemName, setItemName] = useState(null);
  const [itemCategory, setItemCategory] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [itemStock, setItemStock] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function handleSubmit() {
    limitChecker("add", null, currentVendorId, itemStock, itemPrice).then(
      (limitCheckerVal) => {
        if (limitCheckerVal != "Success") {
          showToastMessage(limitCheckerVal);
        } else {
          const docRef = addDoc(collection(db, "items"), {
            addedBy: currentVendorId,
            itemAddedOn: new Date(),
            itemImage: itemImage,
            itemName: itemName,
            itemCategory: itemCategory,
            itemPrice: itemPrice,
            itemQuantity: itemStock,
          }).then((data) => {
            showToastMessage("Added product successfully!");
          });
        }
      }
    );
  }

  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <div className="form">
      <div className="form-body">
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
        <div className="username">
          <label className="form__label" for="firstName">
            Item Category{" "}
          </label>
          {/* <input
            className="form__input"
            type="text"
            value={itemName}
            onChange={(e) => setItemCategory(e.target.value)}
            id="firstName"
            placeholder="Item Category"
          /> */}
          <select name="cars" id="cars" onChange={(e) => setItemCategory(e.target.value)} value={itemCategory}>
            <option value="Aluminium Doors">Aluminium Doors</option>
            <option value="Aluminium Windows">Aluminium Windows</option>
            <option value="Wooden Doors">Wooden Doors</option>
            <option value="PVC Doors">PVC Doors</option>
          </select>
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
      <div class="submitbtn">
        <button onClick={() => handleSubmit()} type="submit" class="btn">
          Add
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

export default AddProduct;
