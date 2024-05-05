
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


import UpdateOrder from './Component/UpdateOrders';

import Header from './Component/header';

import AddWheather from './Component/addwhether';
import WheatherDetails from './Component/Wheatherdetails';
import WheatherRepoart from './Component/Dashboard';
import Login from './regitsr_component/login';
import AddAccount from './regitsr_component/addaccount';


function App() {
  return (
    <div className="App">
 <Router>
 <Header/>
 <Routes>

 
<Route path='/' element={<AddWheather/>}></Route>
<Route path='/whaetherdetails' element={<WheatherDetails/>}></Route>
<Route path='/updateorder/:id' element={<UpdateOrder/>}></Route>
<Route path='/wheatherdashboard' element={<WheatherRepoart/>}></Route>

<Route path='/register' element={<AddAccount/>}></Route>
<Route path='/login' element={<Login/>}></Route>
   </Routes>
   </Router>
    </div>
  );
}

export default App;
