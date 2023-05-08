import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { ButtonTypes } from "../../types";
import Button from "../generic/button/Button";

export default function ProfileAbout({
  openPage,
}: {
  openPage: (path: string) => void;
}) {
  const user = useAppSelector((store) => store.userAbout?.user);

  return (
    <>
      <Information>
        <Field>
          Name: <span>{user?.name}</span>
        </Field>
        <Field>
          Surname: <span>{user?.surname}</span>
        </Field>
        <Field>
          Email: <span>{user?.email}</span>
        </Field>
        <Field>
          Passport: <span>{user?.passport}</span>
        </Field>
        <Field>
          Age: <span>{user?.age}</span>
        </Field>
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
