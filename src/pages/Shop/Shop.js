import "./Shop.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs  } from "firebase/firestore"; 
import { db } from "../../firebase";
import ItemCard from "../../components/ItemCard/itemcard";

function Shop() {
  var [items, setItems] = useState([]);

  const getAllItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    var myItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      myItems.push(
        {
          image: doc.data().itemImage,
          name: doc.data().itemName,
          price: doc.data().itemPrice,
          stock: doc.data().itemQuantity,
          id : doc.id
        }
      )
    });

    console.log(myItems)
    setItems(myItems);
  }


  useEffect(()=>{
    getAllItems();
  }, [])

  return (
    <div>
      <Container>
        <Row className="mt-4">
          {items.map((el, i) => {
            return (
              <ItemCard
               cardData = {el}
              ></ItemCard>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Shop;
