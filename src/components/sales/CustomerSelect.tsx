import React from "react";
import Select from "react-select";
import type { Customer } from "../../assets/customer";

interface Props {
  customers: Customer[];
  value: { value: string; label: string } | null;
  onChange: (option: { value: string; label: string } | null) => void;
}

const CustomerSelect: React.FC<Props> = ({ customers, value, onChange }) => {
  const options = customers.map((c) => ({ value: c.id, label: c.name }));

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="customer" className="text-sm font-medium text-gray-700">
        Customer
      </label>
      <Select
        inputId="customer"
        options={options}
        value={value}
        placeholder="Search for a customer..."
        onChange={(option) => onChange(option)}
        isSearchable
        className="w-full"
      />
    </div>
  );
};

export default CustomerSelect;
