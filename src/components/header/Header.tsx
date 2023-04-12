import "./header.scss";
import profile from "./icons/profile.svg";
import logo from "./icons/neo.svg";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Crypt } from "../../types";
import { useAppSelector } from "../../hooks";

import { useQuery } from "@apollo/client";
import { GET_ALL_CRYPTS } from "../../lib/query/crypt";
import Skeleton from "react-loading-skeleton";
import Sidebar from "../sidebar/Sidebar";

export default function Header() {
  const navigate = useNavigate();
  const walletData = useAppSelector((state) => state.walletPage);

  const { data, loading } = useQuery(GET_ALL_CRYPTS, {
    variables: {
      offset: 0,
      limit: 3,
    },
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
        <ul className="crypto">
          {[...Array(3).keys()].map((index) => (
            <li
              className="crypto__item"
              key={index}
              onClick={() => navigate(`/${data?.getAllCrypts[index].id}`)}
            >
              {!loading && data?.getAllCrypts.length ? (
                <>
                  <span className="crypto__name">
                    {data?.getAllCrypts[index]?.name}
                  </span>{" "}
                  -{" "}
                  <span
                    className={`crypto__price ${
                      data?.getAllCrypts[index]?.changePercent24Hr < 0
                        ? "crypto__price_low"
                        : ""
                    }`}
                  >
                    {Math.floor(+data?.getAllCrypts[index]?.priceUsd * 100) /
                      100}
                    $
                  </span>
                </>
              ) : (
                <Skeleton width={150} height={25} />
              )}
            </li>
          ))}
        </ul>
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
      {/* <WalletModal
        isWalletOpen={isWalletOpen}
        setIsWalletOpen={setIsWalletOpen}
      /> */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </header>
  );
}
