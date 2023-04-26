import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ButtonSizes, ButtonTypes } from "../../../types";
import Button from "../../generic/button/Button";
import checkInputSymbol from "../../generic/checkInputSymbol";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function WalletCard() {
  const [amountToReplenish, setAmountToReplenish] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");

  const CardSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(4, "Too Short!")
      .max(60, "Too Long!")
      .required("Required"),
    card: Yup.number().min(16).max(16),
    code: Yup.number().min(3).max(3),
  });

  function onChange(
    value: string,
    setState: Dispatch<SetStateAction<string>>,
    isCardNumber = false
  ) {
    if (!checkInputSymbol(value, isCardNumber ? 16 : 6)) {
      return null;
    }

    setState(value);
  }

  function dateValidation(value: string) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[0-9/]{2,4}[0-9]{2,4}$/i.test(value)) {
      error = "Invalid date";
    }
    return error;
  }

  return (
    <>
      <Title>Replenish the balance</Title>
      <Formik
        initialValues={{
          fullname: "",
          card: "",
          code: "",
          date: "",
        }}
        validationSchema={CardSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Wrapper>
              <div>
                <Front>
                  <Label>Card number</Label>
                  <Input
                    name="card"
                    value={cardNumber}
                    onChange={(e: any) =>
                      onChange(e.target.value, setCardNumber, true)
                    }
                    top={35}
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  {errors.card ? <div>{errors.card}</div> : null}
                  <Label top={54}>Name</Label>
                  <Input
                    name="fullname"
                    top={61}
                    height={30}
                    fs={18}
                    placeholder="John Doe"
                  />
                  {errors.fullname ? <div>{errors.fullname}</div> : null}
                  <Label top={78} left={75}>
                    Exp. Date
                  </Label>
                  <Input
                    name="date"
                    validate={dateValidation}
                    top={85}
                    height={30}
                    fs={18}
                    width={80}
                    left={75}
                    placeholder="10/10"
                  />
                  {errors.date ? <div>{errors.date}</div> : null}
                </Front>
                <Back>
                  <Label top={23} left={80}>
                    CVV\CVC
                  </Label>
                  <Input
                    name="code"
                    top={30}
                    height={30}
                    fs={18}
                    width={60}
                    left={80}
                    placeholder="XXX"
                  />
                  {errors.code ? <div>{errors.code}</div> : null}
                </Back>
              </div>
              <Group>
                <Button
                  size={ButtonSizes.size_lg}
                  onClick={() => {}}
                  buttonType={ButtonTypes.button_action}
                  type="submit"
                >
                  Replenish
                </Button>
                <InputAmount
                  value={amountToReplenish}
                  onChange={(e) =>
                    onChange(e.target.value, setAmountToReplenish)
                  }
                />
              </Group>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </>
  );
}

const Title = styled.h2`
  font-size: 28px;
  margin: 50px 30px;
  font-weight: 600;
  text-align: center;
`;

const Group = styled.div`
  margin-top: -150px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Front = styled.div`
  height: 250px;
  width: 400px;
  background-color: #d0d0d0;
  border-radius: 7px;
  position: relative;
  z-index: 10;
  border: 1px solid #8b8b8b;
`;

const InputAmount = styled.input`
  width: 200px;
  height: 60px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-top: 30px;
  font-size: 28px;
  position: relative;
`;

const Back = styled(Front)`
  left: 25%;
  z-index: 5;
  top: -180px;
`;

const Input = styled(Field)<{
  height?: number;
  width?: number;
  fs?: number;
  top: number;
  left?: number;
}>`
  position: absolute;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid gray;

  height: ${(p) => (p.height ? p.height : 40)}px;
  width: ${(p) => (p.width ? p.width + "px" : 90 + "%")};
  font-size: ${(p) => (p.fs ? p.fs : 20)}px;
  top: ${(p) => p.top}%;
  left: ${(p) => (p.left ? p.left : 5)}%;
`;

const Label = styled.label<{ top?: number; left?: number }>`
  position: absolute;

  top: ${(p) => (p.top ? p.top : 28)}%;
  left: ${(p) => (p.left ? p.left : 5)}%;
`;
