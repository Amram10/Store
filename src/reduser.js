import firebase from './firebaseApp'
import { v4 as uuidv4 } from 'uuid';


const AppReducer = (state = { products : [], customers : [], purchase : []}, action) =>
{
    switch(action.type)
    {
        case "LOAD PRODUCT" : 
            return {...state, products : action.payload}
        case "LOAD CUSTOMER" : 
            return {...state, customers : action.payload}
        case "LOAD PURCHAS" : 
            return {...state, purchase : action.payload}

        case "ADD_PRODUCT":
            let addProduct={...action.payload}
            firebase.firestore().collection('products').add(action.payload)
            alert ('Product created')
            return {...state, products : [...state.products, addProduct ]}

        case "BUY":
            let addPurch={...action.payload}
            firebase.firestore().collection('purchases').add(action.payload) 
            
              addPurch={...addPurch}
              alert ("Product purchased")  
            
            return {...state, purchase : [...state.purchase, addPurch ]}
            
        case "DELETE_PRODUCT":
           let product_id = action.payload
           let arr1  = [...state.products]
           let purcharr1 = [...state.purchase]
           let index1 = arr1.findIndex(x=>x.id==product_id)
            state.purchase.forEach(purch1=>{ 
          if(purch1.productId==product_id)   
          {
           let indexPurdh1= purcharr1.findIndex(x=>x.id==purch1.id)
           purcharr1.splice(indexPurdh1,1)
           firebase.firestore().collection('purchases').doc(purch1.id).delete()   
          }
           })
           if(index1>=0)
           {
               arr1.splice(index1,1)
               firebase.firestore().collection('products').doc(product_id).delete()
               alert("deleted!")
           }

          return {...state,products:arr1,purchase:purcharr1};

        case "UPDATE_PRODUCT":
            let product_id1 = action.payload.id
            let arr=[...state.products]
            let index = arr.findIndex(x=>x.id==product_id1)
            if (index >=0)
            {
                arr[index]=action.payload
                firebase.firestore().collection('products').doc(product_id1).set(action.payload)
                alert("updeted!")
            }
            
            return {...state,products:arr};
        
            case "ADD_CUSTOMER":
                let addCustomer=action.payload
            firebase.firestore().collection('customers').add(action.payload)
            
                addCustomer={...addCustomer}
                alert('Customer created')
            return {...state, customers : [...state.customers,addCustomer] }


        
            case "UPDATE_CUSTOMER":
                let customer_id= action.payload.id
                let arr2=[...state.customers]
                let index2=arr2.findIndex(x=>x.id==customer_id)
                if(index2>=0)
                {
                arr2[index2]=action.payload
                firebase.firestore().collection('customers').doc(customer_id).set(action.payload)
                }
            case "DELETE_CUSTOMER":
                let customer_id1=action.payload
                let arr3  = [...state.customers]
                let purcharr3=state.purchase
                let index3 = arr3.findIndex(x=>x.id==customer_id1)
                state.purchase.forEach(purch3 =>
                    {   
                      if (customer_id1==purch3.customerId)
                      {
                      
                          let indexpurch3=purcharr3.findIndex(x=>x.id==purch3.id)
                          if (indexpurch3>=0)
                          {
                          firebase.firestore().collection('purchases').doc(purch3.id).delete()
                          purcharr3.splice(indexpurch3,1)
                          }
                      }
                  })
                if(index3>=0)
                  {
                   firebase.firestore().collection('customers').doc(customer_id1).delete()
                   arr3.splice(index3,1)
                   alert("Customer deleted!")
                  }
            
                  return {...state,customers:arr3, purchase:purcharr3};
        default:
            return state;
    }
}


export default AppReducer