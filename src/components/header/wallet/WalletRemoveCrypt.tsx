import styled from "styled-components";
import { ButtonSizes, ButtonTypes, Crypt } from "../../../types";
import Button from "../../generic/button/Button";

interface WalletRemoveCryptProps {
  cryptToDelete: Crypt | null;
  deleteAmount: string | number;
  error: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    cryptToDelete: Crypt
  ) => void;
  deleteCrypt: () => void;
}

export default function WalletRemoveCrypt({
  cryptToDelete,
  deleteAmount,
  error,
  onChange,
  deleteCrypt,
}: WalletRemoveCryptProps) {
  return (
    <Wrapper>
      {cryptToDelete && (
        <>
          <p className="modal__rules">
            Minimal value - 0.00001. Maximal value -{" "}
            {cryptToDelete.amount < 999999
              ? Math.floor(cryptToDelete.amount * 10000) / 10000
              : "999999"}
            .
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            action="submit"
            className="form-delete"
          >
            <input
              value={deleteAmount}
              onChange={(e) => onChange(e, cryptToDelete)}
              type="text"
              className={`form-delete__input ${error ? "error" : ""}`}
              placeholder={`Remove ${cryptToDelete.name}`}
            />
            <Button
              type="submit"
              onClick={deleteCrypt}
              buttonType={ButtonTypes.button_delete}
              size={ButtonSizes.size_sm}
            >
              Remove
            </Button>
          </form>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 30px 0;
`;
