import { useState } from "react";
import { comboboxStyle } from "../../constants.ts";
import Select, { createFilter } from "react-select";
import { scrollWhenKeyboardShown } from "../../Utils.js";
export default function ComboBox({ selectedItem, setSelectedItem, placeholder1, placeholder2, className, options }) {
  const [placeholder, setPlaceholder] = useState(placeholder1);
  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    matchFrom: "any",
    stringify: (option) => `${option.label} ${option.value} ${option.data.alternativeLabel ?? ""}`,
    trim: true,
  };
  return (
    <Select
      onMenuOpen={() => {
        setPlaceholder(placeholder2);
        scrollWhenKeyboardShown(`.combobox.${className}`);
      }}
      onMenuClose={() => setPlaceholder(placeholder1)}
      className={`combobox ${className}`}
      options={options}
      filterOption={createFilter(filterConfig)}
      onChange={setSelectedItem}
      value={selectedItem}
      isMulti={true}
      placeholder={placeholder}
      styles={comboboxStyle}
    />
  );
}
