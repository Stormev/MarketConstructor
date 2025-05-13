import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// templates
import Welcome from './components/welcome/welcome-page.jsx';
import Registration from './components/reg/reg.jsx';
import AboutLayout from './components/about/about-layout.jsx';
import ServicesLayout from './components/services/layout_services.jsx';
import StoreLayout from './components/store/storeLayout.jsx';
import Order from './components/order/order.jsx';
import Login from './components/login/login.jsx';
import AccountDashboard from './components/accountDashboard/accountDashboard.jsx';
import ItemDescriptionLayout from './components/itemDescription/itemDescriptionLayout.jsx';
import Payment from './components/payment/payment.jsx';

class App extends React.Component {
render() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<StoreLayout/>}/>
        <Route path='/about' element={<AboutLayout/>}/>
        <Route path='/reg' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/services' element={<ServicesLayout/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/account' element={<AccountDashboard/>}/>
        <Route path='/product/:id' element={<ItemDescriptionLayout/>}/>
        <Route path='/payment' element={<Payment/>}/>
      </Routes>
    </Router>
  )
}
}


export default App;
