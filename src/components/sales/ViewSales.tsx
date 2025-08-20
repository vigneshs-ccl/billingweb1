import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import type { SaleFormValues } from "../../assets/sales";

const ViewSales: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // sale/customer ID from URL
  const location = useLocation();
  const navigate = useNavigate();

  const [sale, setSale] = useState<SaleFormValues | null>(null);

  useEffect(() => {
    if (location.state?.sales) {
      //  coming via navigate
      setSale(location.state.sales);
    } else if (id) {
      // direct access || refresh - find in localStorage
      const storedSales: SaleFormValues[] =
        JSON.parse(localStorage.getItem("salesData") || "[]") || [];
      const found = storedSales.find((s) => s.customerID === id) || null;
      setSale(found);
    }
  }, [id, location.state]);

  if (!sale) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">Sale not found</h2>
        <button
          onClick={() => navigate("/sales")}
          className="mt-4 bg-[#006666] text-white px-4 py-2 rounded-lg"
        >
          Back to Sales
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sale Details</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-3">
        <p>
          <strong>Date:</strong> {sale.saleDate}
        </p>
        <p>
          <strong>Customer:</strong> {sale.customerName}
        </p>
        <p>
          <strong>Branch:</strong> {sale.branchName}
        </p>
        <p>
          <strong>Status:</strong> {sale.paymentStatus}
        </p>
        <p>
          <strong>Total Items:</strong> {sale.items.length}
        </p>
      </div>

      <button
        onClick={() => navigate("/sale/create")}
        className="mt-6 mr-2 bg-[#006666] text-white px-4 py-2 rounded-lg"
      >
        Edit Sales
      </button>
      <button
        onClick={() => navigate("/sales")}
        className="mt-6 bg-[#006666] text-white px-4 py-2 rounded-lg"
      >
        Back to Sales
      </button>
    </div>
  );
};

export default ViewSales;
