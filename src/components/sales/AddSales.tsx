import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
import { FaEye, FaEdit } from "react-icons/fa";
import type { SaleFormValues } from "../../assets/sales";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

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

const AddSales: React.FC = () => {
  const [records, setRecords] = useState<SaleFormValues[]>([]);

  const navigate = useNavigate();

  const loadSalesData = () => {
    const storedSales: SaleFormValues[] =
      JSON.parse(localStorage.getItem("salesData") || "[]") || [];

    setRecords(storedSales);
  };

  useEffect(() => {
    loadSalesData();
  }, []);

  const handleDelete = (customerID: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const storedSales: SaleFormValues[] =
        JSON.parse(localStorage.getItem("salesData") || "[]") || [];
      const updated = storedSales.filter((c) => c.customerID !== customerID);
      localStorage.setItem("salesData", JSON.stringify(updated));
      loadSalesData();
    }
  };

  const renderActions = (sales: SaleFormValues) => (
    <div className="flex items-center w-full text-2xl cursor-pointer">
      <button
        onClick={() => {
          navigate(`/sale/view/${sales.customerID}`, { state: { sales } });
        }}
        className="mr-4 text-blue-500"
        title="View"
      >
        <FaEye />
      </button>

      <button
        onClick={() =>
          navigate(`/sale/create/${sales.customerID}`, { state: { sales } })
        }
        className="mr-4 text-green-500 cursor-pointer"
        title="Edit"
      >
        <FaEdit />
      </button>

      <button
        onClick={() => handleDelete(sales.customerID)}
        className="text-red-500 cursor-pointer"
        title="Delete"
      >
        <MdDelete />
      </button>
    </div>
  );

  const columns: TableColumn<SaleFormValues>[] = [
    { name: "Date", selector: (row) => row.saleDate, sortable: true },
    { name: "Customer", selector: (row) => row.customerName, sortable: true },
    { name: "Branch", selector: (row) => row.branchName, sortable: true },
    { name: "Total", selector: (row) => row.items.length, sortable: true },
    { name: "Status", selector: (row) => row.paymentStatus, sortable: true },
    {
      name: "Actions",
      cell: (row) => renderActions(row),
    },
  ];
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const storedSales: SaleFormValues[] =
      JSON.parse(localStorage.getItem("salesData") || "[]") || [];

    const filtered = storedSales.filter((c) =>
      c.customerName.toLowerCase().includes(query)
    );

    setRecords(
      filtered.map((customerName) => ({
        ...customerName,
      }))
    );
  };
  return (
    <div className="mt-7 rounded shadow-2xl pt-10 pl-6">
      <div className="flex justify-between p-2">
        <h2 className="text-[1.25rem]">Sales</h2>
        <button
          onClick={() => navigate("/sale/create")}
          className="h-10 bg-[#006666] text-white flex justify-center items-center px-6 py-4 rounded-lg"
        >
          <MdAddCircleOutline size={20} />
          <span className="text-[0.90rem] font-semibold ml-2 cursor-pointer">
            Add New Sale
          </span>
        </button>

       
         
    
      </div>

      <div className="flex space-x-4 p-2">
        <select></select>
        <button className="h-10 bg-[#006666] text-white flex justify-center items-center px-6 py-4 rounded-lg font-bold">
          Filter
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

export default AddSales;
