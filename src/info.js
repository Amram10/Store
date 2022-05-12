import {useState}from 'react'
import { useSelector} from "react-redux";
const FindProd =()=>
{
  const CustomersData= useSelector(state=>state.customers);
  const PurchasedData= useSelector(state=>state.purchase);
  const ProductsData = useSelector(state=>state.products);

  const CustomProd =[]
   //Search for a product purchased by a particular buyer 
 CustomersData.forEach((customr)=> {
     const custom = {id:customr.id,fname:customr.first_name, lname: customr.last_name, product:[]}
     PurchasedData.forEach(purch =>{
      if (purch.customerId==customr.id)
      {
        let prod = ProductsData.find(x=>x.id==purch.productId) 
        prod={...prod,date:purch.date}
        custom.product.push(prod)
      }
    })
    CustomProd.push(custom)
  
  });
   return CustomProd
   }


const FindCustom =()=>
{
  const CustomersData= useSelector(state=>state.customers);
  const PurchasedData= useSelector(state=>state.purchase);
  const ProductsData = useSelector(state=>state.products);
  const ProdCostum =[]
   //Search for a customer purchased by a particular product 
 ProductsData.forEach((produ)=> {
     const product = {id:produ.id, name:produ.name, price: produ.price,quantity:produ.quantity, customer:[]}
     PurchasedData.forEach(purch =>{
      if (purch.productId==produ.id)
      {
        let custo = CustomersData.find(x=>x.id==purch.customerId) 
        custo = {...custo,date:purch.date}
        product.customer.push(custo)
      }
    })
    ProdCostum.push(product)
  
  });
   return ProdCostum
   }

export  {FindProd,FindCustom}