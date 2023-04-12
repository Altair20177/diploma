import styled from "styled-components";
import Select, { GroupBase, Props } from "react-select";
import { useState } from "react";

const allOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function SelectCrypt() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  //   function CustomSelect<
  //     Option,
  //     IsMulti extends boolean = false,
  //     Group extends GroupBase<Option> = GroupBase<Option>
  //   >(props: Props<Option, IsMulti, Group>) {
  //     return (
  //       <Select {...props}  />
  //     );
  //   }

  return (
    <>
      <CustomSelect
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={allOptions}
      />
    </>
  );
}
