import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import {FindProd,FindCustom} from "../info";
function ProductsComp() {
  const storeData = useSelector(state=>state)
  const [totalCrt , setTotalCart] = useState(0);
  const dispatch=useDispatch();
  const[added,setAdded]=useState(false);
  const[prod,setProd]=useState({name:"",price:0,quantity:0})
  useEffect(()=>
  {
   let  totalCart = storeData.purchase.length 
  setTotalCart(totalCart)
  },[storeData]);
  const add_product=()=>
  {
   dispatch ({type:"ADD_PRODUCT", payload:prod})
   setAdded(!added)
  }
const info= FindCustom()
  return (
   <div>

<h1>Products</h1>
    <div style={{float:"left",width : "200px", height : "50px", borderStyle : "solid", borderColor : "red", backgroundColor: "pink", borderWidth : "3px"}}>

      Total products purchased:<br/> {totalCrt}
    </div>
<div style={{float:"right",width:"50%",borderStyle : "solid"}}>
<ul>
  {
   info.map((item,index)=>
      {
        return <li key={index}><Link to ={"/edit_product/"+item.id} >{item.name}</Link><br/>
        Price:{item.price}<br/>
        Quantity:{item.quantity}<br/><br/>
     {(item.customer.length>0)?<div>Buyers:{info[index].customer.map((itm,indx)=>
     {
       return <ul key={indx}><Link to={"/edit_customer/"+itm.id}>{itm.first_name}</Link> {itm.date}</ul>
     })} </div>:"product not sold yet"}</li>
        
      })
  }
</ul>
</div>
<div style={{float:"left",width:"30%",borderStyle : "solid" ,backgroundColor:"grey"}}>
<input type={'button'} value={"Add product"} onClick={()=>setAdded(!added)}/>
{
    added?<div>
Name : <input type={'text'}  onChange={e=> setProd({...prod, name: e.target.value})}/><br/>
Price : <input type={'text'} onChange={e=> setProd({...prod, price: e.target.value})}/><br/>
Quantity : <input type={'text'}  onChange={e=> setProd({...prod, quantity: e.target.value})}/><br/>
<input type={"button"} value="Save changes" onClick={add_product} />
    </div>:<div><div/>



 </div>
}
</div>
    </div>
   
    
  );
}

export default ProductsComp;