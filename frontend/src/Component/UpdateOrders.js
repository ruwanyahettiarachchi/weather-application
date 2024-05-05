import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './orderupdate.css'

function UpdateOrder(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      temperature:"",
        rainfall_humidity:"",
        light:"",
        soil_quality:"",
        wind:"",
        airpollution:"",
        pests_diseases:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8020/order/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdateorder(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8020/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateorder._id,
              ...updateorder,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log('Order updated successfully');
           alert("Order updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='order-update'>

<h2> Update </h2><br></br>
    <lable>Temperature:</lable>
    <input type="text" id="temperature" name="temperature" onChange={handleInputChange} value={updateorder?.temperature }/><br></br>
    <lable>Rainfall and Humidity:</lable>
    <input type="text" id="rainfall_humidity" name="rainfall_humidity" onChange={handleInputChange} value={updateorder?.rainfall_humidity }/><br></br>
    <lable>Light:</lable>
    <input type="text" id="light" name="light" onChange={handleInputChange} value={updateorder?.light }/><br></br> 
    <lable>Soil Quality:</lable>
    <input type="text" id="soil_quality" name="soil_quality" onChange={handleInputChange} value={updateorder?.soil_quality }/><br></br> 
    <lable>Wind:</lable>
    <input type="text" id="wind" name="wind" onChange={handleInputChange} value={updateorder?.wind }/><br></br> 
    <lable>Air Pollution:</lable>
    <input type="text" id="airpollution" name="airpollution" onChange={handleInputChange} value={updateorder?.airpollution }/><br></br> 
    <lable>Pests and Diseases:</lable>
    <input type="text" id="pests_diseases" name="pests_diseases" onChange={handleInputChange} value={updateorder?.pests_diseases }/><br></br> 
    
    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 

 
        </div>
    )
}
export default UpdateOrder;