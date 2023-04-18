import Select, { GroupBase, Props } from "react-select";

export default function CustomSelect<
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
