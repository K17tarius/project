import { useEffect } from "react";
import "./success.css";
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Cookies from "universal-cookie";

function Success() {
    const cookies = new Cookies();
    const cart = cookies.get('cart') ? cookies.get('cart') : []

    useEffect(()=>{
        removeFromDB();
    }, [])

    function removeFromDB(){
        console.log('Removing...')
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
          cookies.set('cart', []);
          window.setTimeout(()=>{
            window.location.href = 'http://localhost:3000/';
          },2500)
        })
      }

  return (
    <>
    <div className="checkContainer">
        <div>
            <div class="checkmark-circle">
                <div class="background"></div>
                <div class="checkmark draw"></div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <h2>Payment Success!</h2>
            </div>
        </div>
    </div>
    </>
  );
}

export default Success;
