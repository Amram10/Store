import { useSelector } from "react-redux";
import {useEffect, useState} from 'react';
import {FindProd,FindCustom} from "../info";
import {Link} from 'react-router-dom'
function PurchasesComp() {
const info= FindProd()
const [custom,setCustom]= useState({customerId:"",productId:""})
const [object,setObject]=useState()
console.table(object)
const [select,setSelect]=useState(true)
const [Isproduct,setIsproduct]=useState(false)
const data=useSelector(state=>state)
const search =()=>
{
if (custom.customerId)
{
  setSelect(false)
  let obj = info.filter(x=>x.id==custom.customerId)
  

  if (custom.productId)
  {
  let prod=obj.product.find(x=>x.id==custom.productId)
  obj={...obj,product:prod}
  }
  setObject(obj)
    console.table(obj)
    setCustom({customerId:"",productId:""})
}
else
{
   setSelect(true)
}
if(object.product.length>0)
{
  setIsproduct(true)
}
}
  return (
   <div>

<h1>Purchased</h1>
{
select?<table border="1">
  <thead><tr><th>Name</th><th>Products</th><th>Date</th></tr></thead>
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
</table>:<div>
  <table border="1">
    <thead><tr><th>Name</th><th>Products</th><th>Date</th></tr></thead>
 <tbody>
{
  Isproduct? object.map((item,index)=>
  {
    return <tr key={index}>
      <td><Link to = {"/edit_customer/"+item.id}>{item.fname}  {item.lname}</Link></td>
    <td>{item.product.map((x,i)=>{return <li key={i}><Link to ={"/edit_product/"+x.id}>{x.name}</Link></li>})}</td>
  <td>{item.product.map((ite,t)=>{return <li key={t}>{ite.date}</li>})}</td>
    </tr>
  }):<div></div>
}

 </tbody>
  </table>
  </div>}
<select  onClick={e=>setCustom({...custom,customerId:e.target.value})}>
{
  info.map((item,index)=>
  {return <option key={index} value={item.id} >{item.fname} {item.lname}</option>})
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



