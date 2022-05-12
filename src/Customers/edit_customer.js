import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams} from 'react-router-dom';

function EditCustomerComp() {
const dispatch=useDispatch();
const params= useParams();
let customer_id=params.id;
const[customer,setCustomer]=useState({id:customer_id, first_name:"",last_name:"",city:""})
const CustomerData= useSelector(state=>state.customers);
const ProductData= useSelector(state=>state.products);
const[purchased,setPurchased]=useState({customerId:customer_id,productId:0,date:""})
const[buy,setBuy]=useState(false);

useEffect(()=>
{
const customer = CustomerData.find(x=>x.id==customer_id);
setCustomer(customer)
},[])

const[updated,setUpdated]=useState(false);
const delete_customer =()=>
{
 dispatch({ type:"DELETE_CUSTOMER", payload:customer_id})
}
const Update_customer =()=>
{
 dispatch({ type:"UPDATE_CUSTOMER", payload:customer})
 setUpdated(!updated)
}
const buy_product=()=>
{
  dispatch({type:"BUY", payload:purchased})
  setBuy(!buy)
}     
  
  return (
   <div>

<h1>Edit customer</h1>

     {
    updated?<div>
First name : <input type={'text'} defaultValue={customer.first_name} onChange={e=> setCustomer({...customer, first_name: e.target.value})}/><br/>
Last name : <input type={'text'} defaultValue={customer.last_name} onChange={e=> setCustomer({...customer, last_name: e.target.value})}/><br/>
City : <input type={'text'} defaultValue={customer.city} onChange={e=> setCustomer({...customer, city: e.target.value})}/><br/>
<input type={"button"} value="Save changes" onClick={Update_customer} />
    </div>:
    <div>
      First name :{customer.first_name}<br/>
Last name :{customer.last_name}<br/>
City :{customer.city}<br/>
<input type={"button"} value="Delete" onClick={delete_customer} />

<input type={"button"} value="Update" onClick={()=>setUpdated(!updated)} />
<input type={"button"} value="Buy product" onClick={()=>setBuy(!buy)}/>
{
  buy?<div><select  onClick={e=>setPurchased({...purchased,productId:e.target.value})}>{ProductData.map((item,index)=>
    {
    return  <option key={index} value={item.id} >{item.name}</option>
})}</select>
<input type={'date'} onChange={e=>setPurchased({...purchased,date:e.target.value})}/><br/><br/>
<input type={"button"} value="Buy" onClick={buy_product}/>
</div>:<div></div>
}
</div>

     }</div>
  );

  }
export default EditCustomerComp;



