import { useSelector } from "react-redux";
import {useEffect, useState} from 'react';
import {FindProd,FindCustom} from "../info";
import { Link } from "react-router-dom";
function PurchaseTableComp(props) {
const [tableData,setTableData]=useState()
const info= FindProd()
useEffect(()=>{
let tdata=info
    if (props.customerID)
    {
       tdata = tdata.find(x=>x.id==props.customerID)
       let prod= tdata.product
          if (props.productID)
              {
              prod = tdata.product.find(y=>y.id==props.productID)
              } 
              tdata ={...tdata,product:prod}
    }
setTableData(tdata)
}

,[props.customerID, props.productID])
console.log(tableData)
  return (  <table border="1">
  <thead><tr><th>Name</th><th>Products</th><th>Date</th></tr></thead>
  <tbody>

  {!props.customerID?
  tableData? 
  tableData.map((item,index)=>
  {
    return <tr key={index}><td>
      <Link  to = {"/edit_customer/"+item.id}>{item.fname} {item.lname}</Link>
    </td>
    <td>
      <ul>
        {item.product?
              item.product.map((itm,indx)=>
          {
            return <li key={indx}><Link to ={"/edit_product/"+itm.id}>{itm.name}</Link></li>
          
          })
          :null 
      }</ul></td>
      <td>
        <ul>
          {
             item.product.map((it,ind)=>
            {
              return <li key={ind}>{it.date}</li>
            })
          }   
        </ul>
      </td>
    </tr>
  })

:  null
: <tr>
  <td> <Link  to = {"/edit_customer/"+tableData.id}>{tableData.fname} {tableData.lname}</Link></td>
  <td><ul>{tableData.product?
  props.productID?<li><Link  to = {"/edit_product/"+tableData.product.id}>{tableData.product.name}</Link></li> :tableData.product.map((item,index)=>
  {return <li key={index}><Link  to = {"/edit_product/"+item.id}>{item.name}</Link></li>
  }):null
    }</ul></td>
    <td><ul>{tableData.product?
  props.productID?<li>{tableData.product.date}</li> :tableData.product.map((itm,indx)=>
  {return <li key={indx}>{itm.date}</li>
  }):null
    }</ul></td>
</tr> }

  </tbody></table>)
  }
export default PurchaseTableComp;
