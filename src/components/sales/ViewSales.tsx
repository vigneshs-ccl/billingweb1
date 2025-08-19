import React from "react";
import {  useNavigate } from "react-router-dom";
import type{SaleFormValues} from "../../assets/sales"
import { useParams } from "react-router-dom";
const ViewSales: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const storedSalesData:SaleFormValues[] = JSON.parse(localStorage.getItem("salesData")|| "[]");

  const sales = storedSalesData.find(c => c.customerID === id);
  if (!sales) return <p>No Sales data found.</p>;

  return (
    <div className="p-6 mt-10 shadow-lg rounded">
      <h1 className="font-bold text-lg mb-4">Sales Details</h1>
      <div className="space-y-6">
        <p>
          <strong>Date: </strong> {sales.saleDate}
        </p>
        <p>
          <strong>Customer: </strong> {sales.customerName}
        </p>
        <p>
          <strong>Branch: </strong> {sales.branchName}
        </p>
        <p>
          <strong>Status: </strong> {sales.paymentStatus}
        </p>
        

      </div>
      <div>
        <button
          onClick={() => navigate(`/sale/create`, { state: { sales } })}
          className="mt-4 bg-[#006666] text-white px-4 py-2 rounded mr-5 text-sm font-bold"
        >
          EDIT CUSTOMER
        </button>
        <button
          onClick={() => navigate("/sales")}
          className="mt-4 bg-[#006666] text-white px-4 py-2 rounded text-sm font-bold"
        >
          BACK TO LIST
        </button>
      </div>
    </div>
  );
};

export default ViewSales;
