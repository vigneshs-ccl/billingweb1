import * as Yup from "yup";

export const validateSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["person", "company"], "Invalid customer type")
    .required("Please select customer type."),

  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must be at most 50 characters.")
    .required("Customer name is required."),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone number is required."),

  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  sort: Yup.number()
  .transform((value, originalValue) => (originalValue === "" ? undefined : value))
  .typeError("Sort order must be a number.")
  .positive("Sort order must be positive.")
  .integer("Sort order must be an integer.")
  .nullable(),


  type1: Yup.string()
    .oneOf(
      ["billing & delivery", "billing", "delivery"],
      "Invalid address type"
    )
    .required("Please select address type."),

  add1: Yup.string().trim().required("Address Line 1 is required."),

  add2: Yup.string().trim(),

  city: Yup.string().trim().required("City is required."),

  state: Yup.string().trim().required("Please select a state."),

  country: Yup.string().trim().required("Country is required."),

  postal: Yup.string()
    .matches(/^[0-9]{6}$/, "Postal code must be exactly 6 digits.")
    .required("Postal code is required."),

  gst: Yup.string()
    .matches(
      /^[0-9A-Z]{15}$/,
      "GST number must be exactly 15 characters (A-Z, 0-9)."
    )
    .required("GST number is required."),
});
