import styled from "styled-components";
import exchange from "./images/exchange.png";
import Button from "../generic/button/Button";
import { ButtonTypes } from "../../types";
import CustomSelect from "./CustomSelect";
import { Option } from "./Converter";
import { Dispatch, SetStateAction } from "react";

interface SelectCrypyProps {
  updateInput: (
    option: Option | null,
    setSelect: Dispatch<SetStateAction<Option | null>>,
    setInput: Dispatch<SetStateAction<string>>,
    value: string,
    selOption: Option | null
  ) => void;
  changeInput: (
    value: string,
    setState: Dispatch<SetStateAction<string>>,
    setAnotherState: Dispatch<SetStateAction<string>>,
    identificator: "value1" | "value2"
  ) => void;
  allOptions: Option[];
  setSelectedOption1: Dispatch<SetStateAction<Option | null>>;
  setSelectedOption2: Dispatch<SetStateAction<Option | null>>;
  selectedOption1: Option | null;
  selectedOption2: Option | null;
  setInput1: Dispatch<SetStateAction<string>>;
  setInput2: Dispatch<SetStateAction<string>>;
  input1: string;
  input2: string;
}

export default function SelectCrypt({
  updateInput,
  changeInput,
  allOptions,
  setSelectedOption1,
  setSelectedOption2,
  setInput1,
  setInput2,
  input1,
  input2,
  selectedOption1,
  selectedOption2,
}: SelectCrypyProps) {
  function clearValues() {
    setInput1("");
    setInput2("");
    setSelectedOption1(null);
    setSelectedOption2(null);
  }

  function changeSelectValues() {
    const temporarySelect = selectedOption1;
    const temporaryInput = input1;

    setSelectedOption1(selectedOption2);
    setSelectedOption2(temporarySelect);

    setInput1(input2);
    setInput2(temporaryInput);
  }

  return (
    <>
      <Title>Converter</Title>
      <Group>
        <SelectWrapper>
          <Label>From:</Label>
          <CustomSelect
            onChange={(option: Option | null) =>
              updateInput(
                option,
                setSelectedOption1,
                setInput1,
                input2,
                selectedOption2
              )
            }
            value={selectedOption1}
            options={allOptions}
          />
        </SelectWrapper>
        <Img onClick={changeSelectValues} src={exchange} alt="exchange" />
        <SelectWrapper>
          <Label>To:</Label>
          <CustomSelect
            onChange={(option: Option | null) =>
              updateInput(
                option,
                setSelectedOption2,
                setInput2,
                input1,
                selectedOption1
              )
            }
            value={selectedOption2}
            options={allOptions}
          />
        </SelectWrapper>
      </Group>
      <Group>
        <Input
          value={input1}
          onChange={(e) =>
            changeInput(e.target.value, setInput1, setInput2, "value1")
          }
          disabled={selectedOption2 && selectedOption1 ? false : true}
        />
        <Input
          value={input2}
          onChange={(e) =>
            changeInput(e.target.value, setInput2, setInput1, "value2")
          }
          disabled={selectedOption2 && selectedOption1 ? false : true}
        />
      </Group>
      <Button onClick={clearValues} buttonType={ButtonTypes.button_action}>
        Clear
      </Button>
    </>
  );
}

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  width: 100%;
`;

const Title = styled.p`
  font-size: 28px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 40%;
  border: 1px solid rgb(226, 226, 226);
  padding: 5px;
  font-size: 20px;
  border-radius: 5px;
`;

const Img = styled.img`
  margin: 17px 5px 0;
  padding: 5px 5px;
  width: 35px;

  &:hover {
    cursor: pointer;
  }
`;
