import { useState } from "react";
import { comboboxStyle } from "../../constants.ts";
import Select from "react-select";
import { scrollWhenKeyboardShown } from "../../Utils.js";
export default function ComboBox({ selectedItem, setSelectedItem, placeholder1, placeholder2, className, options }) {
  const [placeholder, setPlaceholder] = useState(placeholder1);
  return (
    <Select
      onMenuOpen={() => {
        setPlaceholder(placeholder2);
        scrollWhenKeyboardShown(`.combobox.${className}`);
      }}
      onMenuClose={() => setPlaceholder(placeholder1)}
      className={`combobox ${className}`}
      options={options}
      onChange={setSelectedItem}
      value={selectedItem}
      isMulti={true}
      placeholder={placeholder}
      styles={comboboxStyle}
    />
  );
}
