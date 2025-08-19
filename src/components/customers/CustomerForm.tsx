import React, { useEffect } from "react";
import { useFormik } from "formik";
import { validateSchema } from "../../schemas";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface Customer {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  sort: string;
  type1: string;
  add1: string;
  add2: string;
  city: string;
  state: string;
  country: string;
  postal: string;
  gst: string;
}

const CustomerForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData =
    (location.state as { customer?: Customer })?.customer || null;

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik<Customer>({
    initialValues: {
      id: "",
      type: "person",
      name: "",
      phone: "",
      email: "",
      sort: "",
      type1: "billing & delivery",
      add1: "",
      add2: "",
      city: "",
      state: "tamilnadu",
      country: "",
      postal: "",
      gst: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      const storedCustomers: Customer[] =
        JSON.parse(localStorage.getItem("customers") || "[]") || [];

      if (editData) {
        const updated = storedCustomers.map((cust) =>
          cust.id === editData.id ? { ...values, id: editData.id } : cust
        );
        localStorage.setItem("customers", JSON.stringify(updated));
      } else {
        localStorage.setItem(
          "customers",
          JSON.stringify([...storedCustomers, { ...values, id: uuidv4() }])
        );
      }
      navigate("/customers");
    },
  });

  useEffect(() => {
    if (editData) {
      setValues(editData);
    }
  }, [editData, setValues]);

  return (
    <div className="shadow-lg rounded p-15">
      <h1 className="font-bold text-lg mb-3">
        {editData ? "Edit Customer" : "Add New Customer"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="sections flex">
            <div className="fields mr-6">
              <label
                htmlFor="type"
                className="block font-medium text-sm text-gray-700"
              >
                Type:
              </label>
              <select
                name="type"
                id="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                className="p-3 mt-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full"
              >
                <option value="person">Person</option>
                <option value="company">Company</option>
              </select>
            </div>

            <div className="fields">
              <label
                htmlFor="name"
                className="block font-medium text-sm text-gray-700"
              >
                Name<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0  ${
                  errors.name ? "border border-red-500" : ""
                }`}
              />
              {errors.name && touched.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="sections flex">
            <div className="fields mr-6 w-full">
              <label htmlFor="phone" className="block">
                Phone<span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="text"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                  errors.phone ? "border border-red-500" : ""
                }`}
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="fields w-full">
              <label htmlFor="email" className="block">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="sections">
            <div className="fields w-full">
              <label htmlFor="sort" className="block">
                Sort Order
              </label>
              <input
                id="sort"
                type="number"
                value={values.sort}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full${
                  errors.sort ? "border border-red-500" : ""
                }`}
              />
            </div>
          </div>
          <div className="address space-y-5 p-5 shadow-lg w-full">
            <h3 className="mb-8 font-bold">Address 1</h3>
            <div className="sections flex">
              <div className="fields mr-6 w-full">
                <label htmlFor="type1" className="block">
                  Type:
                </label>
                <select
                  name="type1"
                  id="type1"
                  value={values.type1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`p-2 mt-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full`}
                >
                  <option value="billing-delivery">Billing & Delivery</option>
                  <option value="billing">Billing</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              <div className="fields w-full">
                <label htmlFor="add1" className="block">
                  Address Line 1<span className="text-red-500">*</span>
                </label>
                <input
                  id="add1"
                  type="text"
                  value={values.add1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                    errors.add1 ? "border border-red-500" : ""
                  }`}
                />
                {errors.add1 && touched.add1 && (
                  <p className="text-red-500">{errors.add1}</p>
                )}
              </div>
            </div>

            <div className="sections flex">
              <div className="fields mr-6 w-full">
                <label htmlFor="add2" className="block">
                  Address Line 2
                </label>
                <input
                  id="add2"
                  type="text"
                  value={values.add2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full`}
                />
              </div>
              <div className="fields w-full">
                <label htmlFor="city" className="block">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                    errors.city ? "border border-red-500" : ""
                  }`}
                />
                {errors.city && touched.city && (
                  <p className="text-red-500">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="sections flex">
              <div className="fields mr-6 w-full">
                <label htmlFor="state" className="block">
                  State<span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  id="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`p-2 mt-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                    errors.city ? "border border-red-500" : ""
                  }`}
                >
                  <option value="tamilnadu">Tamilnadu</option>
                  <option value="kerala">Kerala</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>

              <div className="fields w-full">
                <label htmlFor="country" className="block">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  id="country"
                  type="text"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                    errors.country ? "border border-red-500" : ""
                  }`}
                />
                {errors.country && touched.country && (
                  <p className="text-red-500">{errors.country}</p>
                )}
              </div>
            </div>

            <div className="sections flex">
              <div className="fields mr-6 w-full">
                <label htmlFor="postal" className="block">
                  Postal Code<span className="text-red-500">*</span>
                </label>
                <input
                  id="postal"
                  type="text"
                  maxLength={6}
                  value={values.postal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                    errors.postal ? "border border-red-500" : ""
                  }`}
                />
                {errors.postal && touched.postal && (
                  <p className="text-red-500">{errors.postal}</p>
                )}
              </div>
              <div className="fields w-full">
                <label htmlFor="gst" className="block">
                  GST No.<span className="text-red-500">*</span>
                </label>
                <input
                  id="gst"
                  type="text"
                  maxLength={15}
                  value={values.gst}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border border-gray-300 mt-2 p-2 rounded-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-0 w-full ${
                    errors.gst ? "border border-red-500" : ""
                  }`}
                />
                {errors.gst && touched.gst && (
                  <p className="text-red-500">{errors.gst}</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <button
                type="submit"
                className="h-9 bg-[#006666] text-white flex items-center px-6 py-4 rounded-lg font-semibold"
              >
                Create Customer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
