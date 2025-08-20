import React, { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import type{Customer} from "../../assets/data"
import type { TableColumn } from "react-data-table-component";


const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#006666",
      color: "white",
      fontSize: "18px",
      fontWeight: "bolder",
    },
  },
};

const AddCustomer: React.FC = () => {
  const [records, setRecords] = useState<Customer[]>([]);
  const navigate = useNavigate();

  const loadCustomers = () => {
    const storedCustomers: Customer[] =
      JSON.parse(localStorage.getItem("customers") || "[]") || [];

    setRecords(
      storedCustomers.map((customer) => ({
        ...customer
      }))
    );
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const storedCustomers: Customer[] =
        JSON.parse(localStorage.getItem("customers") || "[]") || [];
      const updated = storedCustomers.filter((c) => c.id !== id);
      localStorage.setItem("customers", JSON.stringify(updated));
      loadCustomers();
    }
  };

  const renderActions = (customer: Customer) => 
    (
      <div className="flex items-center w-full text-2xl">
        <button
          onClick={() =>
            navigate(`/customer/view/${customer.id}`, { state: { customer } })
          }
          className="mr-4 text-blue-500 cursor-pointer"
          title="View"
        >
          <FaEye />
        </button>
        <button
          onClick={() => navigate(`/customer/create`, { state: { customer } })}
          className="mr-4 text-green-500 cursor-pointer"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(customer.id)}
          className="text-red-500 cursor-pointer"
          title="Delete"
        >
          <MdDelete />
        </button>
      </div>
    );
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const storedCustomers: Customer[] =
      JSON.parse(localStorage.getItem("customers") || "[]") || [];

    const filtered = storedCustomers.filter((c) =>
      c.name.toLowerCase().includes(query)
    );

    setRecords(
      filtered.map((customer) => ({
        ...customer,
        action: renderActions(customer),
      }))
    );
  };

  const columns: TableColumn<Customer>[] = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Type", selector: (row) => row.type, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Action", cell: (row) => renderActions(row),},
  ];

  return (
    <div className="mt-7 rounded shadow-2xl pt-10 pl-6">
      <div className="flex justify-between p-2">
        <h2 className="text-[1.25rem]">Customers</h2>
        <button
          onClick={() => navigate("/customer/create")}
          className="h-10 bg-[#006666] text-white flex justify-center items-center px-6 py-4 rounded-lg"
        >
          <MdAddCircleOutline size={20} />
          <span className="text-[0.90rem] font-semibold ml-2 cursor-pointer">
            Add New Customer
          </span>
        </button>
      </div>

      <div className="flex justify-end mb-4 mt-2 p-2">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-sm p-2 focus:border-blue-600 focus:ring-0 focus:outline-none"
          onChange={handleSearch}
        />
      </div>

      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
      />
    </div>
  );
};

export default AddCustomer;
