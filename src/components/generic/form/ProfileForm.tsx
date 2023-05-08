import { Form, Formik } from "formik";
import styled from "styled-components";
import { ButtonTypes, CryptFromFetch, User } from "../../../types";
import Button from "../button/Button";
import OneField from "./OneField";

interface ProfileFormProps {
  SignupSchema: any;
  bestCrypts: CryptFromFetch[] | undefined;
  user: User | undefined;
  validationPassport: (value: string) => string | undefined;
}

export default function ProfileForm({
  SignupSchema,
  bestCrypts,
  user,
  validationPassport,
}: ProfileFormProps) {
  return (
    <Formik
      initialValues={{
        name: user?.name,
        surname: user?.surname,
        email: user?.email,
        passport: user?.passport,
        age: user?.age,
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <FormContainer>
            <WrapperForm>
              <Text>Change profile data</Text>
              <OneField
                name="name"
                placeholder="Name"
                isErrorYup={errors.name ? "true" : "false"}
              />
              {errors.name && touched.name ? (
                <Error>{errors.name}</Error>
              ) : null}
              <OneField
                name="surname"
                placeholder="Surname"
                isErrorYup={errors.surname ? "true" : "false"}
              />
              {errors.surname && touched.surname ? (
                <Error>{errors.surname}</Error>
              ) : null}
              <OneField
                name="email"
                type="email"
                placeholder="Email"
                isErrorYup={errors.email ? "true" : "false"}
              />
              {errors.email && touched.email ? (
                <Error>{errors.email}</Error>
              ) : null}
              <OneField
                name="passport"
                placeholder="Passport"
                isErrorYup={errors.passport ? "true" : "false"}
                validate={validationPassport}
              />
              {errors.passport && touched.passport ? (
                <Error>{errors.passport}</Error>
              ) : null}
              <OneField
                name="age"
                placeholder="Age"
                isErrorYup={errors.age ? "true" : "false"}
              />
              {errors.age && touched.age ? <Error>{errors.age}</Error> : null}
            </WrapperForm>
            <WrapperForm>
              <Text>Change user's password</Text>
              <OneField
                name="oldPassword"
                placeholder="Old password"
                isErrorYup={errors.oldPassword ? "true" : "false"}
                type="password"
              />
              {errors.oldPassword && touched.oldPassword ? (
                <Error>{errors.oldPassword}</Error>
              ) : null}
              <OneField
                name="newPassword"
                placeholder="New password"
                isErrorYup={errors.newPassword ? "true" : "false"}
                type="password"
              />
              {errors.newPassword && touched.newPassword ? (
                <Error>{errors.newPassword}</Error>
              ) : null}
              <OneField
                name="newPasswordRepeat"
                placeholder="Repeat new password"
                isErrorYup={errors.newPasswordRepeat ? "true" : "false"}
                type="password"
              />
              {errors.newPasswordRepeat && touched.newPasswordRepeat ? (
                <Error>{errors.newPasswordRepeat}</Error>
              ) : null}
              <Text>Selected crypts</Text>
              <BestCryptsContainer>
                {bestCrypts &&
                  bestCrypts.map((crypt) => {
                    return <BestCrypt key={crypt.id}>{crypt.name}</BestCrypt>;
                  })}
              </BestCryptsContainer>
              <Button onClick={() => {}} buttonType={ButtonTypes.button_action}>
                Add
              </Button>
            </WrapperForm>
          </FormContainer>
          <Button
            onClick={() => {}}
            buttonType={ButtonTypes.button_action}
            type="submit"
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const BestCryptsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const BestCrypt = styled.p`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: rgba(226, 226, 226, 0.599);
  font-size: 18px;
  margin-right: 30px;
`;

const Text = styled.p`
  font-size: 20px;
  padding: 20px;
  text-align: center;
  font-weight: 600;
`;

const WrapperForm = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  width: 40%;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Error = styled.p`
  color: #b00202;
  padding-left: 5px;
`;
