import { useSelector,useDispatch } from "react-redux";
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import {FindProd,FindCustom} from "../info";
function CustomersComp() {
  const dispatch=useDispatch()
  const[customer,setCustomer]=useState({city:"",first_name:"",last_name:""})
  const CustomersData= useSelector(state=>state.customers);
  const PurchasedData= useSelector(state=>state.purchase);
  const ProductsData = useSelector(state=>state.products);
  const[added,setAdded]=useState(false);
  const add_customer=()=>
  {
  dispatch ({type:"ADD_CUSTOMER", payload:customer})
   setAdded(!added)
  }
const info = FindProd()

  return (
   <div>

<h1>Customers</h1>
<table border="1">
 <thead>
  <tr><th>Name</th><th>Products</th><th>Date</th></tr>
  </thead>
   <tbody>
  {
  info.map((item,index)=>
  {
  return <tr key={index}>
  <td><Link to = {"/edit_customer/"+item.id}>{item.fname}  {item.lname}</Link></td>
  <td>{info[index].product.map((x,i)=>{return <li key={i}><Link to ={"/edit_product/"+x.id}>{x.name}</Link></li>})}</td>
  <td>{info[index].product.map((ite,t)=>{return <li key={t}>{ite.date}</li>})}</td>
  </tr>})}
  </tbody>
  </table>

   <div style={{float:"left", width:"30%",borderStyle:"solid", backgroundColor:"grey"}}>
     <input type={'button'} value={"Add customer"} onClick={()=>setAdded(!added)}/>{
       added?<div>
         First name : <input type={'text'}  onChange={e=> setCustomer({...customer, first_name: e.target.value})}/><br/>
Last name : <input type={'text'} onChange={e=> setCustomer({...customer, last_name: e.target.value})}/><br/>
City : <input type={'text'}  onChange={e=> setCustomer({...customer, city: e.target.value})}/><br/>
<input type={"button"} value="Save customer" onClick={add_customer} />
       </div>:<div></div>
     }
   </div>


    </div>   
  );


 
}

export default CustomersComp;



  



