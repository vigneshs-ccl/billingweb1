import { useFormik, FormikProvider, FieldArray } from "formik";
import { useState } from "react";
import CustomerSelect from "./CustomerSelect";
import BranchSelect from "./BranchSelect";
import type { Customer } from "../../assets/customer";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

interface Branch {
  branchName: string;
}
const branches: Branch[] = [{ branchName: "branch1" }];

const storedCustomers: Customer[] =
  JSON.parse(localStorage.getItem("customers") || "[]") || [];

interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
  description: string;
}

interface SaleFormValues {
  customerID: string;
  customerName: string | null;
  branchName: string | null;
  un: string;
  saleDate: string;
  billingAddress: string;
  deliveryAddress: string;
  paymentStatus: string;
  notes: string;
  items: SaleItem[];
}

const SaleForm: React.FC = () => {
  const location = useLocation();
  const editData: SaleFormValues = location.state?.sales || null;

  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik<SaleFormValues>({
    initialValues: {
      customerID: "",
      customerName: null,
      branchName: null,
      un: "",
      saleDate: "",
      billingAddress: "",
      deliveryAddress: "",
      paymentStatus: "paid",
      notes: "",
      items: [
        { productId: "", quantity: 0, price: 0, description: "" }, // start with one item
      ],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const storedSales: SaleFormValues[] =
        JSON.parse(localStorage.getItem("salesData") || "[]") || [];

      if (editData) {
        const updated = storedSales.map((s) =>
          s.customerID === editData.customerID
            ? { ...values, id: editData.customerID }
            : s
        );

        localStorage.setItem("salesData", JSON.stringify(updated));
      } else {
        localStorage.setItem(
          "salesData",
          JSON.stringify([...storedSales, { ...values, id: uuidv4() }])
        );
      }

      console.log("Form submitted:", values);
      navigate("/sales");
    },
  });

  const { values, handleChange, handleBlur, setFieldValue, handleSubmit } =
    formik;

  return (
    <div className="shadow-xl rounded p-15">
      <h1 className="font-bold text-xl mb-3">New Sales</h1>

      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Customer Select */}
          <CustomerSelect
            customers={storedCustomers}
            value={
              values.customerID && values.customerName
                ? { value: values.customerID, label: values.customerName }
                : null
            }
            onChange={(option) => {
              setFieldValue("customerID", option ? option.value : null);
              setFieldValue("customerName", option ? option.label : null);
            }}
          />

          {/* Branch Select */}
          <BranchSelect
            branches={branches}
            value={values.branchName}
            onChange={(value) => setFieldValue("branchName", value)}
          />

          {/* 3 */}
          <label
            htmlFor="un"
            className="font-medium text-sm text-gray-700 block mt-3"
          >
            123
          </label>
          <select
            name="un"
            id="un"
            value={values.un}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full"
          >
            <option value="">--select--</option>
          </select>

          {/* Sale Date */}
          <label
            htmlFor="sale_date"
            className="text-sm font-medium text-gray-700"
          >
            Sale Date
          </label>
          <input
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 shadow-sm w-full h-10 p-2 border rounded cursor-pointer"
            type="date"
            name="saleDate"
            id="sale_date"
            value={values.saleDate}
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={(e) => {
              (e.target as HTMLInputElement).showPicker?.();
            }}
          />

          {/* Products Section */}
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Products
            </label>

            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {values.items.map((item, index) => (
                    <div
                      key={index}
                      className="item-row border p-2 border-gray-300 rounded mb-2 flex gap-2 relative "
                    >
                      <div className="grid grid-cols-4 gap-2 w-full">
                        {/* Product select */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Product
                          </label>
                          <select
                            name={`items[${index}].productId`}
                            value={item.productId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0"
                          >
                            <option value="">Select Product</option>
                            <option value="1">WSDXW</option>
                          </select>
                        </div>

                        {/* Quantity */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name={`items[${index}].quantity`}
                            value={item.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Qty"
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0"
                          />
                        </div>

                        {/* Price */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Original Price
                          </label>
                          <input
                            type="number"
                            name={`items[${index}].price`}
                            value={item.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Price"
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <input
                            type="text"
                            name={`items[${index}].description`}
                            value={item.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Description"
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0"
                          />
                        </div>
                        {/* Delete button (hide for first item) */}
                        {values.items.length > 1 && (
                          <button
                            type="button"
                            className="absolute  top-0 right-0 text-red-600"
                            onClick={() => remove(index)}
                          >
                            <MdDeleteOutline className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Item button */}
                  <button
                    type="button"
                    className="bg-gray-600 text-white px-2 py-1 rounded mt-2"
                    onClick={() =>
                      push({
                        productId: "",
                        quantity: 1,
                        price: 0,
                        description: "",
                      })
                    }
                  >
                    + Add Item
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <label
            htmlFor="billingAddress"
            className="font-medium text-sm text-gray-700 block mt-3"
          >
            Billing Address
          </label>
          <select
            name="billingAddress"
            id="billingAddress"
            value={values.billingAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full"
          >
            <option value="">select</option>
          </select>

          <label className="inline-flex p-3 items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <div
              className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
          peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
          after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
          after:h-5 after:w-5 after:transition-all dark:border-gray-600 
          peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
            ></div>
            <span className="text-sm text-gray-700 ml-3">
              Delivery Address Same As Billing
            </span>
          </label>

          {!checked === true ? (
            <div>
              <label
                htmlFor="deliveryAddress"
                className="font-medium text-sm text-gray-700 block"
              >
                Delivery Address
              </label>
              <select
                name="deliveryAddress"
                id="deliveryAddress"
                value={values.deliveryAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className="p-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full"
              >
                <option value="">select</option>
              </select>
            </div>
          ) : null}

          <label
            htmlFor="paymentStatus"
            className="font-medium text-sm text-gray-700 block"
          >
            Payment Status
          </label>
          <select
            name="paymentStatus"
            id="paymentStatus"
            value={values.paymentStatus}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full"
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
          </select>

          <label
            htmlFor="notes"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            rows={4}
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 shadow-sm p-2 rounded focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0"
          ></textarea>
          <div className="w-full flex justify-end items-center">
            <button
              type="submit"
              className="h-9 bg-[#006666] text-white flex items-center px-6 py-4 rounded-lg font-semibold"
            >
              Create Sale
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default SaleForm;
