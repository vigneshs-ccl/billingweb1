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
