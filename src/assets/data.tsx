export interface Customer {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  add1?: string;
  city?: string;
  state?: string;
  country?: string;
  postal?: string;
  gst?: string;
}

// // Get saved customers
// const customers: Customer[] =
//   JSON.parse(localStorage.getItem("customers") || "[]") || [];

// // Add the action buttons dynamically to each customer
// export const data: Customer[] = customers.map((customer) => ({
//   ...customer,
// }));
