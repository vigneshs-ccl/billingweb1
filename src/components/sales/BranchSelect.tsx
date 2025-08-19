import React from "react";
import Select from "react-select";

interface Branch {
  branchName: string;
}

interface Props {
  branches: Branch[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const BranchSelect: React.FC<Props> = ({ branches, value, onChange }) => {
  const options = branches.map((b) => ({
    value: b.branchName,
    label: b.branchName,
  }));

  const selectedOption = options.find((o) => o.label === value) || null;

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="customer" className="text-sm font-medium text-gray-700">
        Branch
      </label>
      <Select
        inputId="customer"
        options={options}
        value={selectedOption}
        placeholder="Search for a branch..."
        onChange={(option) => onChange(option ? option.label : null)}
        isSearchable
        className="w-full"
      />
    </div>
  );
};

export default BranchSelect;
