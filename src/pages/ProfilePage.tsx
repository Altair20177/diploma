import * as Yup from "yup";
import styled from "styled-components";
import ProfileForm from "../components/generic/form/ProfileForm";
import { useAppSelector } from "../hooks";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    surname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    age: Yup.number().min(18).max(100).required("Required"),
    passport: Yup.string(),
  });

  function validatePassport(value: string) {
    let error;

    if (!value) {
      error = "Required";
    } else if (value.length < 9) {
      error = "Passport should contain 9 symbols";
    } else if (!/^[A-Z]{2}[0-9]{7}$/i.test(value)) {
      error = "Passport should contain 2 letter and 7 numbers";
    }
    return error;
  }

  const userAbout = useAppSelector((store) => store.userAbout);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    userAbout && setLoading(false);
  }, [userAbout]);

  return (
    <Wrapper>
      <Title>Hi, Maksim!</Title>
      {!loading && (
        <ProfileForm
          bestCrypts={userAbout?.topCrypts}
          SignupSchema={SignupSchema}
          user={userAbout?.user}
          validationPassport={validatePassport}
        />
      )}
    </Wrapper>
  );
}

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-top: 70px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
`;
