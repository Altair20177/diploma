import styled from "styled-components";

import { useState } from "react";

interface OneFieldProps {
  placeholder: string;
}

export default function OneField({ placeholder }: OneFieldProps) {
  const [text, setText] = useState<string>("");

  return (
    <Input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={placeholder}
    />
  );
}

const Input = styled.input`
  border-bottom: 1px solid rgb(226, 226, 226);
  padding: 3px 10px;
  font-size: 20px;
  transition: 0.2s;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    padding-left: 5px;
  }
`;
