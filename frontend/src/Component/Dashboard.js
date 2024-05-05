import { useEffect, useState } from 'react'
import axios from "axios"
import './repoart.css'

function WheatherRepoart(){
    const [countlist,setcountlist]=useState([]);
    const [customerlist,setcustomerlist]=useState([]);


//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8020/count")
   const { count } = data.data;
   setcountlist(count);//get count
   setcustomerlist(data.data.data);//get table data
 
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])





    
return(
    <div className='repoart'>
  <h3>Total Wheather Cast :</h3>
            {countlist !== null ? (
                <p>Total Users of Whether List: {countlist}
               
              
                </p>
                
            ) : (
                <p>Loading...
                     </p>
          
               
            )}

<h3> Summary Of Wheather  :</h3>
 

    

<table>
    <thead>
        <tr>
            <th>Temperature</th>
            <th>Rainfall</th>
            <th>Soil Quantity</th>
        </tr>
    </thead>
    <tbody>
        {customerlist.map((e, index) => {

            
            let temperatureMessage;
            let rainfaullmessage;
            let soildmessage;
            if (e.temperature > 30) {
                temperatureMessage = "during periods of extreme heat.";
            } else if (e.temperature < 10) {
                temperatureMessage = "ensuring adequate soil moisture through irrigation is crucial during periods of low temperature.";
            } else {
                temperatureMessage = "within normal range.";
            }

           if(e. rainfall_humidity<150){
            rainfaullmessage="Supplemental irrigation can be used to compensate for insufficient rainfall"
           }else if(e. rainfall_humidity>250){
            rainfaullmessage="Enhancing soil drainage through measures such as contour plowing, terracing, and installing drainage channels can help prevent waterlogging and soil erosion in areas with high rainfall."
           }else  {
            rainfaullmessage = "within normal range.";
            }



            if(e.soil_quality<4.5){
                soildmessage="Incorporating organic matter, such as compost, manure, or leaf litter, into the soil can improve fertility and enhance soil structure"
            }
            else if(e.soil_quality>6){
                soildmessage=": Acidifying agents such as elemental sulfur or ammonium sulfate can be applied to lower soil pH and make the soil more acidic."
            }
            else{
                soildmessage = "within normal range.";
            }



            return (
                <tr key={index}>
                    <td>{e.temperature }C ={temperatureMessage}</td>
                    <td>{e.rainfall_humidity }mm ={rainfaullmessage}</td>
                    <td>{e.soil_quality}pH ={soildmessage}</td>
                </tr>
            );
        })}
    </tbody>
</table>

                        
            
              

                     
                    
                
                
          
           

    </div>
)




}
export default WheatherRepoart;