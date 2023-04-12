import styled from "styled-components";
import SelectCrypt from "./SelectCrypt";

export default function Converter() {
  return (
    <Wrapper>
      <SelectCrypt />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: 50px auto 0;
`;
