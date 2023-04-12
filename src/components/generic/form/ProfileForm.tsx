import styled from "styled-components";
import { ButtonActions, ButtonTypes } from "../../../types";
import Button from "../button/Button";
import OneField from "./OneField";

export default function ProfileForm() {
  return (
    <>
      <OneField placeholder="Name" />
      <OneField placeholder="Surname" />
      <OneField placeholder="Email" />
      <OneField placeholder="Passport" />
      <OneField placeholder="Age" />
      <ButtonsSection>
        <Button
          buttonType={ButtonTypes.button_action}
          action={ButtonActions.accept}
          onClick={() => {}}
        >
          Save
        </Button>
        <Button
          buttonType={ButtonTypes.button_action}
          action={ButtonActions.cancel}
          onClick={() => {}}
        >
          Cancel
        </Button>
      </ButtonsSection>
    </>
  );
}

const ButtonsSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
