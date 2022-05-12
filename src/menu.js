import{Route , Link, Routes} from "react-router-dom"
import CustomersComp from "./Customers/customers";
import ProductsComp from "./Products/products";
import PurchasesComp from "./Purchases/purchased";
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import firebase from './firebaseApp';
import EditProductComp from "./Products/edit_product";
import EditCustomerComp from "./Customers/edit_customer";

function MenuComp() {
let products=[];
let customers=[];
let purchases=[];
const storeData= useSelector(state=>state)
const dispatch = useDispatch();

  useEffect(async () =>
  {

    let product = await firebase.firestore().collection('products').get();
    let customer = await firebase.firestore().collection('customers').get();
    let purchase = await firebase.firestore().collection('purchases').get();
  
    product.forEach(doc =>
      {
        let prod = {id : doc.id, name : doc.data().name, price : doc.data().price, quantity : doc.data().quantity};
        products.push(prod)
      })
  

        customer.forEach(doc =>
      {
        let custom = {id : doc.id, city : doc.data().city, first_name : doc.data().first_name, last_name : doc.data().last_name};
        customers.push(custom)
      })

        purchase.forEach(doc =>
      {
        let purchas = {id : doc.id, customerId : doc.data().customerId, productId : doc.data().productId, date : doc.data().date};
        purchases.push(purchas)
      })
            dispatch({ type : "LOAD PRODUCT", payload : products})
            dispatch({ type : "LOAD CUSTOMER", payload : customers})
            dispatch({ type : "LOAD PURCHAS", payload : purchases})

  },[storeData.customers.length,storeData.products.length,storeData.purchase.length])
  return (
    <div >
    <Link to ="/products" >Products</Link> <br/>
    <Link to ="/customers" >Customers</Link> <br/>
    <Link to ="/purchased" >Purchased</Link> <br/>

    <Routes>
        <Route path="/" element={<ProductsComp/>}></Route>
        <Route path="/products" element={<ProductsComp/>}></Route>
        <Route path="/customers" element={<CustomersComp/>}></Route>
        <Route path="/purchased" element={<PurchasesComp/>}></Route>
        <Route path="/products/:id" element={<ProductsComp/>}></Route>
        <Route path="/customers/:id" element={<CustomersComp/>}></Route>
        <Route path ="/edit_product/:id" element={<EditProductComp/>}></Route>  
        <Route path ="/edit_customer/:id" element={<EditCustomerComp/>}></Route>  

    </Routes>
  
      

      
    </div>
  );
}

export default MenuComp;