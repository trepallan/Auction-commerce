import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './component/Login';
import Home from './component/Home';
import Navigation from './component/Navigation';
import Logout from './component/Logout';
import  Details from './component/ProductDetails.js';
import Register from './component/Register';
import NewAuction from './component/NewAuction';

function App() {
    return( 
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>     
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/product/:id" element={<Details/>}/>
          <Route path="/makeauction" element={<NewAuction/>}/>
          <Route path="*" element={<h1>404 Page Not Found</h1>}/>
        </Routes>
      </BrowserRouter>);
};
export default App;