import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export function limitChecker(
  type,
  itemId,
  vendorId,
  currentItemStock,
  currentItemPrice
) {
  return new Promise((resolve, reject) => {
    const maxStockOfEachItem = 10;
    const maxPriceOfEachItem = 1000;

    const maxItemsAddedByVendor = 10;
    const maxTotalPriceOfItems = maxItemsAddedByVendor * maxPriceOfEachItem;

    if (currentItemPrice > maxPriceOfEachItem) {
      resolve("Max item price exceeded!");
    }
    if (currentItemStock > maxStockOfEachItem) {
      resolve("Max item stock exceeded!");
    }

    var currentTotalPrice = 0;
    var currentItemCount = 0;

    const q = query(collection(db, "items"), where("addedBy", "==", vendorId));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (type == "edit") {
            if(doc.id == itemId){
            currentTotalPrice += currentItemPrice * currentItemStock;
        }
        } else {
          currentTotalPrice += doc.data().itemPrice * doc.data().itemQuantity;
        }
        currentItemCount += 1;
      });
      if (currentItemCount > maxItemsAddedByVendor) {
        resolve("Max item count limit excceeded!");
      }

      if(currentTotalPrice > maxTotalPriceOfItems){
        resolve("Max total price of items exceeded")
      }

      resolve("Success");
    });
  });
}
