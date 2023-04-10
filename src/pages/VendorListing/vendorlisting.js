import "./vendorlisting.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc  } from "firebase/firestore";
import { db } from "../../firebase";
import Cookies from "universal-cookie";

function Vendorlisting() {
  const cookies = new Cookies();
  const currentVendorId =  cookies.get('uid');
  
  var [listing, setListing] = useState([]);
  var [loaded, setLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const getAllItems = async () => {
    const q = query(
      collection(db, "items"),
      where("addedBy", "==", currentVendorId)
    );
    const querySnapshot = await getDocs(q);
    var myItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      myItems.push({
        itemId: doc.id,
        itemName: doc.data().itemName,
        quantity: doc.data().itemQuantity,
        price: doc.data().itemPrice,
        dateAdded: doc.data().itemAddedOn.toDate(),
      });
    });

    setListing(myItems);
    setLoaded(true);
  };

  function openAddPage() {
    window.open("/addproduct", "_self");
  }

  function removeProduct(itemId){
    deleteDoc(doc(db, "items", itemId)).then((data)=>{
      showToastMessage('Deleted Succesfully!');
      window.setTimeout(()=>{
        window.location.reload(false);
      },1000);
    })
  }

  function showToastMessage(msg) {
    setToastMessage(msg);
    setShowToast(true);
    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function openPage(itemId) {
    window.open("/editproduct?id=" + itemId, "_self");
  }

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <Container>
        <Row className="mt-4">
          <Col md="12">
            {loaded == false && (
              <>
                <div>Loading...</div>
              </>
            )}
            {loaded == true && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>Item ID</th> */}
                    <th>Item Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Last Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listing.map((el, i) => {
                    return (
                      <>
                        <tr>
                          <td>{i + 1}</td>
                          {/* <td>{el.itemId}</td> */}
                          <td>{el.itemName}</td>
                          <td>{el.quantity}</td>
                          <td>{el.price}</td>
                          <td>{el.dateAdded.toString()}</td>
                          <td>
                            <u
                              onClick={() => {
                                openPage(el.itemId);
                              }}
                            >
                              Edit
                            </u>{" "}
                            <u onClick={() => {
                                removeProduct(el.itemId);
                              }}>Remove</u>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            )}
            <Button
              onClick={() => {
                openAddPage();
              }}
            >
              Add Product
            </Button>
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
    </div>
  );
}

export default Vendorlisting;
