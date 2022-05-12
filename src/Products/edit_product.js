import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams} from 'react-router-dom';
import {FindProd,FindCustom} from "../info";

function EditProductComp() {
const dispatch=useDispatch();
const params= useParams();
const[prod,setProd]=useState({})
const [isCustomer,setIsCustomer]=useState(false)
const storeData= FindCustom()
useEffect(()=>
{
let prod_id=params.id;
const product = storeData.find(x=>x.id==prod_id);
if(product.customer.length>0)
{
  setProd(product)
  setIsCustomer(true)
}
},[])


const[updated,setUpdated]=useState(false);
const delete_prod =()=>
{
 dispatch({ type:"DELETE_PRODUCT", payload:params.id})
}
const Update_prod =()=>
{
 dispatch({ type:"UPDATE_PRODUCT", payload:prod})
setUpdated(!updated)
}
  return (
   <div>

<h1>Edit products</h1>


{
    updated?<div>
Name : <input type={'text'} defaultValue={prod.name} onChange={e=> setProd({...prod, name: e.target.value})}/><br/>
Price : <input type={'text'} defaultValue={prod.price} onChange={e=> setProd({...prod, price: e.target.value})}/><br/>
Quantity : <input type={'text'} defaultValue={prod.quantity} onChange={e=> setProd({...prod, quantity: e.target.value})}/><br/>
<input type={"button"} value="Save changes" onClick={Update_prod} />
    </div>:
    <div>
Name :{prod.name}<br/>
Price :{prod.price}<br/>
Quantity :{prod.quantity}<br/>
<h3>Buyer:</h3>{isCustomer? prod.customer.map((item,index)=>
{
  return <li key={index}>{item.first_name} {item.last_name} <br/>date:{item.date}</li>
}):<div>product dont sold yet</div>}

<br/>
<input type={"button"} value="Delete" onClick={delete_prod} />

<input type={"button"} value="Update" onClick={()=>setUpdated(!updated)} /></div>
}



    </div>
  );
  
  }
export default EditProductComp;