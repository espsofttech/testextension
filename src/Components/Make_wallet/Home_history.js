import React,{useEffect,useState} from "react";
import { getTransaction } from '../Action/action';


const Home_history = (props) =>{
 
    const [Transaction, setTransactions]= useState([])
    useEffect(()=>{
        TRansaction();
    },[])
    const TRansaction = async () => {
        let getAllTransaction = await getTransaction();
        setTransactions(getAllTransaction)

      }
  
    return(
        <>  

      <div>
       
      </div>
        </>
    )
}
export default Home_history;