import { useState } from "react";
import axios from "axios";
import './addorder.css'

function AddWheather() {
    const [order, setOrder] = useState({
        temperature: "",
        rainfall_humidity: "",
        light: "",
        soil_quality: "",
        wind: "",
        airpollution: "",
        pests_diseases: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { value, name } = e.target;

        // Validate if value is a number or empty
        if (!isNaN(value) || value === "") {
            setOrder((prev) => ({
                ...prev,
                [name]: value,
            }));
            setError("");
        } else {
            setError("Please enter numbers only.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error) return; // Prevent form submission if there's an error
        const data = await axios.post("http://localhost:8020/create", order);
        console.log(data);
        alert("Order added to Cart!");
    };

    return (
        <div className="add-order">
            <h2>Weather</h2>
            <form onSubmit={handleSubmit}>
                <label>Temperature:</label>
                <input type="text" id="temperature" name="temperature" value={order.temperature} onChange={handleChange} />
                <br></br>
                <label>Rainfall and Humidity:</label>
                <input type="text" id="rainfall_humidity" name="rainfall_humidity" value={order.rainfall_humidity} onChange={handleChange} />
                <br></br>
                <label>Light:</label>
                <input type="text" id="light" name="light" value={order.light} onChange={handleChange} />
                <br></br>
                <label>Soil Quality:</label>
                <input type="text" id="soil_quality" name="soil_quality" value={order.soil_quality} onChange={handleChange} />
                <br></br>
                <label>Wind:</label>
                <input type="text" id="wind" name="wind" value={order.wind} onChange={handleChange} />
                <br></br>
                <label>Air Pollution:</label>
                <input type="text" id="airpollution" name="airpollution" value={order.airpollution} onChange={handleChange} />
                <br></br>
                <label>Pests and Diseases:</label>
                <input type="text" id="pests_diseases" name="pests_diseases" value={order.pests_diseases} onChange={handleChange} />
                <br></br>

                {error && <div className="error">{error}</div>}

                <button id="addbtn">Add Details</button>
            </form>
            <br></br>
        </div>
    );
}

export default AddWheather;
