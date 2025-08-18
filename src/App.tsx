import React from "react";
import "./App.css";
import AddCustomer from "./components/AddCustomer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ViewCustomer from "./components/ViewCustomer";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<AddCustomer />} />
          <Route path="customer/create" element={<CustomerForm />} />
          <Route path="customer/view/:id" element={<ViewCustomer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
