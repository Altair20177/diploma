import "./header.scss";
import profile from "./icons/profile.svg";
import logo from "./icons/neo.svg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Crypt, CryptFromFetch } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { useQuery } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import Sidebar from "../sidebar/Sidebar";
import { GET_USER } from "../../lib/query/user";
import styled from "styled-components";
import { GET_ALL_CRYPTS } from "../../lib/query/crypt";
import { setUser } from "../../lib/actions/userActions";

export default function Header() {
  const navigate = useNavigate();
  const walletData = useAppSelector((state) => state.walletPage);
  const dispatch = useAppDispatch();

  const { data: userAbout, loading: loadingUser } = useQuery(GET_USER, {
    variables: {
      email: "maks.tananykin.20177@mail.ru",
      password: "qwe12345",
    },
  });
  const { data: allCrypts, loading } = useQuery(GET_ALL_CRYPTS, {
    variables: {
      offset: 0,
      limit: 100,
    },
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    !loadingUser && userAbout && dispatch(setUser(userAbout.getUser));
  }, [loadingUser]);

  function walletPrice() {
    if (walletData) {
      const sum = walletData.reduce(
        (prev: number, curr: Crypt) => prev + curr.amount * Number(curr.price),
        0
      );

      return `Balance ${Math.floor(sum * 100) / 100} USD`;
    }
  }

  return (
    <header>
      <div className="content header">
        <div className="logo" onClick={() => navigate("/main")}>
          <div className="item-wrapper">
            <img src={logo} alt="logo" className="item__icon" />
          </div>
          <p className="logo__name">Cryptorius</p>
        </div>
        {loadingUser ? (
          [...Array(3).keys()].map((index) => {
            return <Skeleton key={index} width={150} height={25} />;
          })
        ) : userAbout.getUser.topCrypts.length ? (
          <ul className="crypto">
            {userAbout.getUser.topCrypts.map((crypt: CryptFromFetch) => (
              <li
                className="crypto__item"
                key={crypt.id}
                onClick={() => navigate(`/${crypt.id}`)}
              >
                <span className="crypto__name">{crypt.name}</span> -{" "}
                <span
                  className={`crypto__price ${
                    crypt.changePercent24Hr < 0 ? "crypto__price_low" : ""
                  }`}
                >
                  {Math.floor(+crypt.priceUsd * 100) / 100}$
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Text>You don't have selected cryptocurrencies</Text>
        )}
        <div
          className="item wallet"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <div className="wallet-about">
            <p className="wallet-about__text">Profile</p>
            <p className="wallet-about__numbers">
              {walletData && walletData.length
                ? walletPrice()
                : "Wallet is empty"}
            </p>
          </div>
          <div className="item-wrapper">
            <img src={profile} alt="wallet" className="item__icon" />
          </div>
        </div>
      </div>
      {!loading && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          allCrypts={allCrypts.getAllCrypts}
        />
      )}
    </header>
  );
}

const Text = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
