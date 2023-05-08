import styled from "styled-components";

import { Field } from "formik";

interface OneFieldProps {
  placeholder: string;
  name: string;
  isErrorYup: "true" | "false";
  type?: string;
  validate?: (value: string) => string | undefined;
}

export default function OneField({
  placeholder,
  name,
  isErrorYup,
  type,
  validate,
}: OneFieldProps) {
  return (
    <Wrapper>
      <label htmlFor={name}>{placeholder}</label>
      <Input
        placeholder={placeholder}
        name={name}
        iserroryup={isErrorYup}
        type={type}
        validate={validate}
      />
    </Wrapper>
  );
}

const Input = styled(Field)<{ iserroryup: string }>`
  border-bottom: 1px solid
    ${(p) => (p.iserroryup === "true" ? "#b00202" : "rgb(226, 226, 226)")};
  padding: 3px 10px;
  font-size: 20px;
  transition: 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    padding-left: 5px;
  }
`;

const Wrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 5px;

  label {
    display: block;
    padding-bottom: 5px;
    letter-spacing: 2px;
  }
`;
