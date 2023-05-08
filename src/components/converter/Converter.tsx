import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { CryptFromFetch } from "../../types";
import checkInputSymbol from "../generic/checkInputSymbol";
import SelectCrypt from "./SelectCrypt";

export interface Option {
  value: string;
  label: string;
  price: string;
}

export default function Converter({
  allCrypts,
}: {
  allCrypts: CryptFromFetch[];
}) {
  const [selectedOption1, setSelectedOption1] = useState<Option | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<Option | null>(null);

  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");

  const allOptions: Option[] = allCrypts.map((crypt) => {
    const newOpt: Option = { value: "", label: "", price: "0" };

    newOpt.value = crypt.id;
    newOpt.label = crypt.name;
    newOpt.price = crypt.priceUsd;

    return newOpt;
  });

  function changeInput(
    value: string,
    setState: Dispatch<SetStateAction<string>>,
    setAnotherState: Dispatch<SetStateAction<string>>,
    identificator: "value1" | "value2"
  ) {
    if (!checkInputSymbol(value)) {
      return null;
    }

    let diff = null;

    switch (identificator) {
      case "value1":
        diff =
          selectedOption1 && selectedOption2
            ? +selectedOption1.price / +selectedOption2.price
            : null;
        break;
      case "value2":
        diff =
          selectedOption1 && selectedOption2
            ? +selectedOption2.price / +selectedOption1.price
            : null;
        break;
    }

    diff && setAnotherState(String((diff * +value).toFixed(2)));
    setState(value);
  }

  function updateInput(
    option: Option | null,
    setSelect: Dispatch<SetStateAction<Option | null>>,
    setInput: Dispatch<SetStateAction<string>>,
    value: string,
    selOption: Option | null
  ) {
    setSelect(option);

    if (option && selOption) {
      const num = ((+selOption.price / +option.price) * +value).toFixed(2);
      setInput(String(num));
    }
  }
  return (
    <Wrapper>
      <SelectCrypt
        updateInput={updateInput}
        changeInput={changeInput}
        allOptions={allOptions}
        setSelectedOption1={setSelectedOption1}
        setSelectedOption2={setSelectedOption2}
        selectedOption1={selectedOption1}
        selectedOption2={selectedOption2}
        setInput1={setInput1}
        setInput2={setInput2}
        input1={input1}
        input2={input2}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 40px auto 0;
`;
