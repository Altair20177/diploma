import styled from "styled-components";
import { ButtonTypes } from "../../types";
import Button from "../generic/button/Button";

export default function ProfileAbout({
  openPage,
}: {
  openPage: (path: string) => void;
}) {
  const arr = [
    { key: "Name", value: "Maksim" },
    { key: "Surname", value: "Tananykin" },
    { key: "Email", value: "maks.tananykin.20177@mail.ru" },
    { key: "Passport", value: "HB3138337" },
    { key: "Age", value: "20" },
  ];

  return (
    <>
      <Information>
        {arr.map((elem: { key: string; value: string }) => {
          return (
            <Field key={elem.key}>
              {elem.key}: <span>{elem.value}</span>
            </Field>
          );
        })}
      </Information>
      <Button
        onClick={() => openPage("profile")}
        buttonType={ButtonTypes.button_action}
      >
        Change information
      </Button>
    </>
  );
}

const Field = styled.p`
  border-bottom: 2px solid rgb(226, 226, 226);
  padding: 5px 7px 7px;
  font-size: 20px;
  width: 80%;
  margin-bottom: 5px;

  span {
    font-weight: 600;
  }
`;

const Information = styled.div`
  margin-bottom: 30px;
`;
