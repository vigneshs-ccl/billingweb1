import React from "react";
import "./App.css";
import AddCustomer from "./components/customers/AddCustomer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerForm from "./components/customers/CustomerForm";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ViewCustomer from "./components/customers/ViewCustomer";
import AddSales from "./components/sales/AddSales";
import SaleForm from "./components/sales/SaleForm";
import ViewSales from "./components/sales/ViewSales";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<AddCustomer />} />
          <Route path="customer/create" element={<CustomerForm />} />
          <Route path="customer/view/:id" element={<ViewCustomer />} />
          <Route path="sales" element={<AddSales />} />
          <Route path="sale/create" element={<SaleForm />} />
          <Route path="sale/view/:id" element={<ViewSales/>}/>
          <Route path="sale/create/:id" element={<SaleForm/>}/>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
