import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Customer {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  add1: string;
  city: string;
  state: string;
  country: string;
  postal: string;
  gst: string;
  [key: string]: any; // allows flexibility for extra fields
}

const ViewCustomer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Type casting location.state
  const customer = (location.state as { customer?: Customer })?.customer;

  if (!customer) return <p>No customer data found.</p>;

  return (
    <div className="p-6 mt-10 shadow-lg rounded">
      <h1 className="font-bold text-lg mb-4">Customer Details</h1>
      <div className="space-y-6">
        <p>
          <strong>Name: </strong> {customer.name}
        </p>
        <p>
          <strong>Type: </strong> {customer.type}
        </p>
        <p>
          <strong>Email: </strong> {customer.email}
        </p>
        <p>
          <strong>Phone: </strong> {customer.phone}
        </p>
        <p>
          <strong>Address 1: </strong> {customer.add1}
        </p>
        <p>
          <strong>City: </strong> {customer.city}
        </p>
        <p>
          <strong>State: </strong> {customer.state}
        </p>
        <p>
          <strong>Country: </strong> {customer.country}
        </p>
        <p>
          <strong>Postal: </strong> {customer.postal}
        </p>
        <p>
          <strong>GST: </strong> {customer.gst}
        </p>
      </div>
      <div>
        <button
          onClick={() => navigate(`/customer/create`, { state: { customer } })}
          className="mt-4 bg-[#006666] text-white px-4 py-2 rounded mr-5 text-sm font-bold"
        >
          EDIT CUSTOMER
        </button>
        <button
          onClick={() => navigate("/customers")}
          className="mt-4 bg-[#006666] text-white px-4 py-2 rounded text-sm font-bold"
        >
          BACK TO LIST
        </button>
      </div>
    </div>
  );
};

export default ViewCustomer;
