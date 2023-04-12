import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks";
import { Crypt } from "../../types";
import Converter from "../converter/Converter";
import cross from "../generic/icons/cross.svg";
import ProfileAbout from "../profile/ProfileAbout";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const walletData = useAppSelector((state) => state.walletPage);
  const navigate = useNavigate();

  const sum = walletData.reduce(
    (prev: number, curr: Crypt) => prev + curr.amount * Number(curr.price),
    0
  );

  const diff = walletData.reduce(
    (prev: number, curr: Crypt) =>
      prev + curr.amount * Number(curr.price) * Number(curr.change) * 0.01,
    0
  );

  function openPage(path = "") {
    setIsSidebarOpen(false);
    navigate("/" + path);
  }

  function getWalletData() {
    const totalBalance = Math.floor(sum * 100) / 100;
    const diffUSD = Math.floor(diff * 100) / 100;
    const diffPerc = sum !== 0 ? Math.floor((diff / sum) * 10000) / 100 : 0;

    return { totalBalance, diffUSD, diffPerc };
  }

  return (
    <>
      <Container
        isSidebarOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />
      <SidebarLayout isSidebarOpen={isSidebarOpen}>
        <img
          src={cross}
          alt="cross"
          className="modal__cross"
          onClick={() => setIsSidebarOpen(false)}
        />
        <Title clicked onClick={() => openPage("wallet")}>
          Balance
        </Title>
        <BalanceAbout>
          Total: <span> {getWalletData().totalBalance}</span> USDT
        </BalanceAbout>
        {/* <BalanceAbout>
            Diff USD: <span>{getWalletData().diffUSD}</span> $
          </BalanceAbout>
          <BalanceAbout>
            Diff percantage: <span>{getWalletData().diffPerc}</span> %
          </BalanceAbout> */}
        <Title clicked onClick={() => openPage("profile")}>
          About Profile
        </Title>
        <ProfileAbout />
        <Converter />
      </SidebarLayout>
    </>
  );
}

const Container = styled.div<{ isSidebarOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  transition: 0.4s;
  z-index: 80;
  opacity: 0.4;

  ${(p) =>
    !p.isSidebarOpen &&
    `
      z-index: -20;
      opacity: 0;
  `}
`;

const SidebarLayout = styled.div<{ isSidebarOpen: boolean }>`
  width: 500px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  transition: 0.4s;
  background-color: white;
  z-index: 100;
  border-left: 1px solid rgb(226, 226, 226);
  padding: 15px;

  ${(p) => !p.isSidebarOpen && "right: -500px;"}
`;

const Title = styled.p<{ clicked?: boolean }>`
  font-size: 28px;
  width: fit-content;
  margin-bottom: 15px;
  margin-top: 30px;

  ${(p) =>
    p.clicked
      ? css`
          margin-top: 30px;

          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        `
      : "margin-top: 30px"};
`;

const BalanceAbout = styled.p`
  padding-top: 3px;
  font-size: 18px;
  letter-spacing: 1px;

  span {
    font-weight: 600;
  }
`;
