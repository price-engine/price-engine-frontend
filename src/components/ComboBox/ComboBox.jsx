import { useState } from "react";
import { comboboxStyle } from "../../constants.ts";
import Select from "react-select";

export default function ComboBox({ selectedItem, setSelectedItem, placeholder1, placeholder2, className, options }) {
  const [placeholder, setPlaceholder] = useState(placeholder1);
  return (
    <Select
      onMenuOpen={() => {
        setPlaceholder(placeholder2);
        if (window.innerWidth < 843)
          new Promise((r) => setTimeout(r, 200)).then(() =>
            document.querySelector(`.${className}`).scrollIntoView(true, { behavior: "smooth" })
          );
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
