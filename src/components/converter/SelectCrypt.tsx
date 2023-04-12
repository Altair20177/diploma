import styled from "styled-components";
import Select, { ActionMeta, GroupBase, Props } from "react-select";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

const allOptions: Option[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function SelectCrypt() {
  const [selectedOption1, setSelectedOption1] = useState<Option | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<Option | null>(null);

  function CustomSelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
  >(props: Props<Option, IsMulti, Group>) {
    return (
      <Select
        {...props}
        maxMenuHeight={300}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "rgb(226, 226, 226);",
            primary: "black",
          },
        })}
      />
    );
  }

  return (
    <>
      <GroupSelect>
        <CustomSelect
          onChange={(option: Option | null) => {
            setSelectedOption1(option);
          }}
          value={selectedOption1}
          options={allOptions}
        />

        <CustomSelect
          onChange={(option: Option | null) => {
            setSelectedOption2(option);
          }}
          value={selectedOption2}
          options={allOptions}
        />
      </GroupSelect>
    </>
  );
}

const GroupSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
