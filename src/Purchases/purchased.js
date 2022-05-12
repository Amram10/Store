import { useSelector } from "react-redux";
import {useEffect, useState} from 'react';
import {FindProd,FindCustom} from "../info";
import PurchaseTableComp from "./purchaseTable";
function PurchasesComp() {
const info= FindProd()
const [custom,setCustom]= useState({customerId:"",productId:""})
const [isSearch,setIsSearch]=useState(false)
const data=useSelector(state=>state)
const search =()=>
  {
    console.log(custom)
    if(custom.customerId)
    {
      setIsSearch(true)
    }
    else setIsSearch(false)
  }
  return (
   <div>

<h1>Purchased</h1>


 
     {
       isSearch?
       <PurchaseTableComp customerID={custom.customerId} productID={custom.productId}/>
       :
       <PurchaseTableComp/>
     }
        
  

 
<select  onClick={e=>setCustom({...custom,customerId:e.target.value})}>
{
  data.customers.map((item,index)=>
  {return <option key={index} value={item.id} >{item.first_name} {item.last_name}</option>})
}</select>
<select  onClick={e=>setCustom({...custom,productId:e.target.value})}>
{
  data.products.map((item,index)=>
  {return <option key={index} value={item.id} >{item.name}</option>})
}</select>
  <br/><br/>
  <input type={'button'} value={"Search"} onClick={search}/>
    </div>
  );
}

export default PurchasesComp;


