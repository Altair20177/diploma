import styled from "styled-components";

export default function Footer() {
  type TermsType = {
    name: string;
  };

  const terms: TermsType[] = [
    {
      name: "© Copyright 2022 - 2023",
    },
    {
      name: "ALL RIGHTS RESERVED",
    },
    {
      name: "TERMS AND CONDITIONS",
    },
  ];

  return (
    <Wrapper>
      {terms.map((term: TermsType) => (
        <p key={term.name}>{term.name}</p>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  border-top: 1px solid #e2e2e2;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
`;
