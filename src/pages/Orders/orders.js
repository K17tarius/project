import { useEffect, useState } from "react";
import "./orders.css";
import Cookies from "universal-cookie";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

function Orders(){
  const cookies = new Cookies();

  var [orders, setOrders] = useState([]);

  useEffect(()=>{
    const q = query(
      collection(db, "orders"),
      where("addedBy", "==", cookies.get('uid'))
    );
    getDocs(q).then((querySnapshot)=>{
      var myItems = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        myItems.push({
          'items' : doc.data().items,
          'id' : doc.id,
          'addedon' : doc.data().itemAddedOn.toDate()
        })

      });
      console.log(myItems)
      setOrders(myItems)
    });
 
  }, [])


  return (
    <div>
       {orders.map((el, i) => {
          return (
            <div className="orderBox">
                <b>Order #{el.id}</b>
                <span className="timestamp">{el.addedon.toString().split(' ')[1] + ' ' + el.addedon.toString().split(' ')[2] + ' ' + el.addedon.toString().split(' ')[3]}</span>
                <br></br>
                <br></br>
                <div><u>Items - </u></div>
                {el.items.map((el2, j) => {
                  return (
                    <div>
                      {el2.name} (Rs {el2.price})
                    </div>
                  )
                })}
                
            </div>
          )
       })}
    </div>
  );
}

export default Orders;