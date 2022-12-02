import React from "react";
import './Sidebar.css'
import {Link} from 'react-router-dom'
// import { Card } from './Card'
// import {Protected} from '../Protected'
import Dashboard from "../Pages/Dashboard";
import { Routes,Route } from "react-router-dom";
import ManageInvoice from "../Pages/ManageInvoice";
import ManageCustomer from '../Pages/ManageCustomer'
import AddCustomer from '../Pages/AddCustomer'
import AddInvoice from "../Pages/AddInvoice";
import EditCustomer from "../Pages/EditCustomer";
import EditInvoice from "../Pages/EditInvoice";
import ViewCustomer from "../Pages/ViewCustomer"
import ProtectedOutlet from '../Protected';

const Sidebar = () => {
  return (
    <div>
      <div class="sidebar ">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <Link class="nav-link" to={"/dashboard"}><i class="fa-solid fa-dashboard"></i></Link>
        <Link class="nav-link" to={"/managecustomer"}><i class="fa-solid fa-person"></i></Link>
        <Link class="nav-link" to={"/manageinvoice"}><i class="fa-solid fa-file-invoice"></i></Link>
      </div>

      <div class="content">
        <Routes>
        <Route element={<ProtectedOutlet/>} >
            <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/managecustomer" element={<ManageCustomer />} />
          <Route exact path="/manageinvoice" element={<ManageInvoice />} />
          <Route exact path="/addcustomer" element={<AddCustomer/>}/>
          <Route exact path="/editCustomer/:id" element={<EditCustomer/>}/>
          <Route exact path="/addinvoice" element={<AddInvoice/>}/>
          <Route exact path="/editInvoice/:id" element={<EditInvoice/>}/>
          <Route exact path="/viewCustomer/:id" element={<ViewCustomer/>}/>
          </Route>
        </Routes> 
      </div>
    </div>
  );
};

export default Sidebar;

