import  { useEffect, useState,useRef } from 'react'
import axios from "axios"
import './orderdetails.css'
import {useReactToPrint} from "react-to-print";

function WheatherDetails(){
    const componentPDF=useRef();
    const [showdiscounts,setshowdiscounts]=useState([]);
    const [searchkey,setsearchkey]=useState('');

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8020/")
    console.log(data.data.success)
    if(data.data.success){
        setshowdiscounts(data.data.data)
    }
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])

//delete
const handledelete= async(id)=>{
    const data=await axios.delete("http://localhost:8020/delete/"+id)
    if(data.data.success){
        getfetchdata()
        console.log(data.data.message)
        alert("Order item deleted Successfully!")
    }
}
//generatePDF
const generatePDF=useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"show services ",
    onAfterPrint:()=>alert("data save in pdf")
})
//serach
const handlesearch = (e) => {

    filterdata(searchkey);
}
const filterdata = (searchKey) => {
    const filteredData = showdiscounts.filter(customer =>
        customer.temperature.toLowerCase().includes(searchKey.toLowerCase())
    );
    setshowdiscounts(filteredData);
}

    return(
        <div className="showorders">
             <div className='searchbtn'>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='search' className='in'/> <t></t> 
       
        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
                <div ref={componentPDF} style={{width:'100%'}}>
 <table>
    <tr>
              <th>Temperature</th>
              <th>Rainfall and Humidity</th>
              <th>Light</th>
              <th>Soil Quality</th>
              <th>Wind</th>
              <th>Air Pollution</th>
              <th>Pests and Diseases</th>
             
              
              </tr>


              <tbody>
                  { 
                     showdiscounts.map((e1)=>{
                      return(
                          <tr> 
                            <td> {e1.temperature}</td> 
                            <td> {e1.rainfall_humidity}</td> 
                            <td> {e1.light}</td> 
                            <td> {e1.soil_quality}</td> 
                            <td> {e1.wind}</td> 
                            <td> {e1.airpollution}</td> 
                            <td> {e1.pests_diseases}</td> 
                         
                           
                            <td>
                              <a href={`/updateorder/${e1._id}`}>Edit Order</a>
                              <button onClick={()=>handledelete(e1._id)}>Delete Order</button>
                            </td>
                          </tr>
                      )

              })
                  }
              </tbody>
  </table>
  <button onClick={generatePDF}>Download Repoart</button>
  </div>
        </div>
    )
}
export default WheatherDetails;