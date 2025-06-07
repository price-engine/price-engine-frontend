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
      theme={(theme) => {
        return {
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "var(--light-green)",
            // neutral50: "var(--light-green)", //chosen option color
            // neutral20: "var(--light-green)", //arrow color with the | next to it
            // danger: "#DE350B",
            // dangerLight: "#FFBDAD",
            neutral0: "var(--combobox-option-background-color)",
            // neutral10: "#27b06a",  //chosen option background-color after getting added
            // neutral40: "red",  // group title color
            // neutral60: "red",  //arrow color without the | next to it
            // neutral80: "white", //chosen option text-color after getting added
          },
        };
      }}
    />
  );
}
