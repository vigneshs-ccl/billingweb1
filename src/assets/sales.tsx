export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
  description: string;
}

export interface SaleFormValues {
  customerID: string;
  customerName: string;
  branchName: string;
  un: string;
  saleDate: string;
  billingAddress: string;
  deliveryAddress: string;
  paymentStatus: string;
  notes: string;
  items: SaleItem[];
}
